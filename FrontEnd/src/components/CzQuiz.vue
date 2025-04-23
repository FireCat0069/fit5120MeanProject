<template>
  <div class="container">
    <div class="nav-bar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/quiz-bank" class="nav-link">Quiz Bank</router-link>
      <span>Contact us</span>
    </div>

    <h1>
      Digital <span class="highlight">Citizenship</span> Survey
    </h1>

    <!-- 如果未提交反馈，则显示答题内容 -->
    <div v-if="!feedbackDisplayed">
      <div
        v-for="(question, index) in questions"
        :key="question.question_order"
        class="question-block"
      >
        <p class="question-text">
          {{ index + 1 }}. {{ question.question }}
        </p>

        <!-- 单选 & 多选题 -->
        <div class="options" v-if="question.type !== 'fill-in-the-blank'">
          <button
            v-for="(option, i) in question.options"
            :key="i"
            class="option-btn"
            @click="selectAnswer(question.question_order, option, question.type, $event)"
          >
            {{ option }}
          </button>
        </div>

        <!-- 填空题 -->
        <div v-else>
          <input
            type="text"
            class="option-btn"
            style="max-width: 600px;"
            v-model="answers[question.question_order]"
            placeholder="Please type your answer here"
          />
        </div>

        <hr />
      </div>

      <div class="submit-section">
        <button class="submit-btn" @click="handleSubmit">Submit</button>
      </div>
    </div>

    <!-- 提交后显示反馈 -->
    <div v-else class="feedback-section">
      <h2>Quiz Feedback</h2>
      <!-- 通用反馈 -->
      <div v-if="generalFeedback" class="general-feedback">
        <p>{{ generalFeedback }}</p>
      </div>

      <div v-if="feedbackList.length === 0">
        <p>No feedback available.</p>
      </div>
      <div v-else>
        <div
          v-for="(feedback, index) in feedbackList"
          :key="feedback.question_order"
          class="feedback-item"
        >
          <h3>Question {{ feedback.question_order }}</h3>
          <p>
            <strong>Correct Answer:</strong>
            {{ feedback.correctAnswer }}
          </p>
          <p>
            <strong>Your Answer:</strong>
            <span v-if="feedback.isCorrect === null">Not answered</span>
            <span v-else-if="feedback.isCorrect">Correct</span>
            <span v-else>Incorrect</span>
          </p>
          <p>
            <strong>Explanation:</strong>
            {{ feedback.explanation }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CzQuiz",
  data() {
    return {
      questions: [],
      answers: {},
      feedbackList: [],
      generalFeedback: "",
      feedbackDisplayed: false
    };
  },
  methods: {
    fetchQuestions() {
      fetch("https://fit5120mainprojecttp20backend.onrender.com/api/mbtiquiz/questions")
        .then(res => res.json())
        .then(data => {
          this.questions = data;
        })
        .catch(err => console.error(err));
    },

    selectAnswer(questionOrder, option, type, event) {
      const buttons = event.currentTarget.closest(".options").querySelectorAll(".option-btn");

      if (type === "single-choice") {
        buttons.forEach(btn => btn.classList.remove("selected"));
        event.currentTarget.classList.add("selected");
        this.answers[questionOrder] = option;
      } else if (type === "multiple-choice") {
        const current = this.answers[questionOrder] || [];
        const index = current.indexOf(option);

        if (index === -1) {
          current.push(option);
          event.currentTarget.classList.add("selected");
        } else {
          current.splice(index, 1);
          event.currentTarget.classList.remove("selected");
        }

        this.answers[questionOrder] = current;
      }
    },

    handleSubmit() {
      const payload = [];

      this.questions.forEach(q => {
        const answer = this.answers[q.question_order];
        if (Array.isArray(answer)) {
          answer.forEach(opt => {
            payload.push({ option: opt, question_order: q.question_order });
          });
        } else {
          payload.push({ option: answer, question_order: q.question_order });
        }
      });

      fetch("https://fit5120mainprojecttp20backend.onrender.com/api/mbtiquiz/validate-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(result => {
          console.log("✅ 服务器返回：", result);
          // 更新为新的返回结构
          this.feedbackList = result.results || [];
          this.generalFeedback = result.feedback || "";
          this.feedbackDisplayed = true;
        })
        .catch(err => {
          console.error("❌ 提交失败：", err);
          alert("提交失败，请检查控制台和服务器状态");
        });
    }
  },
  mounted() {
    document.title = "Digital Citizenship Survey";
    this.fetchQuestions();
  }
};
</script>

<style>
.container {
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  padding: 40px 60px;
  font-family: Arial, sans-serif;
  overflow-y: auto;
  max-height: 100vh;
  background-color: #ffffff;
}

.nav-bar {
  position: absolute;
  top: 2vh;
  right: 5vw;
  display: flex;
  gap: 3vw;
  font-size: 24px;
  color: #1d1d1d;
  white-space: nowrap;
}

.nav-link {
  color: #1d1d1d;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.router-link-active {
  color: #1d1d1d;
}

h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: left;
  color: #050c26;
}

.highlight {
  color: #f18829;
}

.question-block {
  margin-bottom: 40px;
}

.question-text {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1d1d1d;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  padding: 14px 20px;
  max-width: 600px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  font-size: 16px;
  color: #333;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.option-btn:hover {
  background-color: #fff8f5;
  border-color: #ff7426;
}

.option-btn.selected {
  background-color: #ff7426;
  color: white;
  border-color: #ff7426;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 30px 0;
}

.submit-section {
  text-align: center;
  margin-top: 50px;
}

.submit-btn {
  padding: 14px 32px;
  font-size: 18px;
  background-color: #f18829;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background-color: #e65f14;
}

.feedback-section {
  margin-top: 50px;
}

.general-feedback {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.feedback-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
}

.feedback-item h3 {
  margin-top: 0;
  color: #000;
}

.feedback-section * {
  color: #000 !important;
}
</style>
