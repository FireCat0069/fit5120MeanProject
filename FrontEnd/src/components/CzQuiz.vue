<template>
    <div class="container">
      <h1>
        Digital <span class="highlight">Citizenship</span> Survey
      </h1>
  
      <div
        v-for="(question, index) in questions"
        :key="question._id"
        class="question-block"
      >
        <p class="question-text">
          {{ index + 1 }}. {{ question.question }}
        </p>
        <div class="options">
          <button
            v-for="(option, i) in question.options"
            :key="i"
            :class="['option-btn', answers[question._id] === option ? 'selected' : '']"
            @click="selectAnswer(question._id, option)"
          >
            {{ option }}
          </button>
        </div>
        <hr />
      </div>
  
      <div class="submit-section">
        <button class="submit-btn" @click="handleSubmit">Submit</button>
      </div>
  
      <div v-if="showWarning" class="modal-overlay">
        <div class="modal">
          <p>Please answer all questions before submitting.</p>
          <button class="modal-btn" @click="showWarning = false">OK</button>
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
        showWarning: false
      };
    },
    methods: {
      fetchQuestions() {
        fetch("/api/mbtiquiz")
          .then(res => res.json())
          .then(data => {
            this.questions = data;
          })
          .catch(err => {
            console.error("Error fetching quiz data:", err);
          });
      },
      selectAnswer(questionId, option) {
        this.$set(this.answers, questionId, option);
      },
      handleSubmit() {
        const allAnswered = this.questions.every(q => this.answers[q._id]);
        if (!allAnswered) {
          this.showWarning = true;
        } else {
          console.log("All questions answered!");
          // 提交逻辑留空，后续可扩展
        }
      }
    },
    mounted() {
      document.title = "Digital Citizenship Survey"; // ✅ 设置网页标题
      this.fetchQuestions();
    }
  };
  </script>
  
  <style scoped>
  .container {
  width: 100vw;
  position: absolute;
  left: 0;
  top:0;
  padding: 40px 60px; /* 顶部间距 & 左右留白 */
  font-family: Arial, sans-serif;
  overflow-y: auto;
  max-height: 100vh;
  background-color: #ffffff;
  box-shadow: none; /* 不再居中就可以去掉阴影 */
  border-radius: 0;  /* 不再居中可以不用圆角 */
}


h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: left;
  color: #050C26;
}

.highlight {
  color: #F18829;
}

.question-block {
  margin-bottom: 40px;
}

.question-text {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1D1D1D;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  padding: 14px 20px;
  border: 2px solid #E0E0E0;
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
  border-color: #FF7426;
}

.option-btn.selected {
  background-color: #FF7426;
  color: white;
  border-color: #FF7426;
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
  background-color: #F18829;
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 300px;
}

.modal-btn {
  margin-top: 20px;
  padding: 10px 24px;
  background-color: #FF7426;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
}

  </style>
  