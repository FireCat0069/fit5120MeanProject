<template>
  <div class="container">
    <h1>
      Digital <span class="highlight">Citizenship</span> Survey
    </h1>

    <div
      v-for="(question, index) in questions"
      :key="question.order"
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
          @click="selectAnswer(question.order, option, question.type, $event)"
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
          v-model="answers[question.order]"
          placeholder="Please type your answer here"
        />
      </div>

      <hr />
    </div>

    <div class="submit-section">
      <button class="submit-btn" @click="handleSubmit">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CzQuiz",
  data() {
    return {
      questions: [],
      answers: {}
    };
  },
  methods: {
    fetchQuestions() {
      fetch("/api/mbtiquiz/questions")
        .then(res => res.json())
        .then(data => {
          // 直接使用返回的数据，因为每个题目已有唯一的 order
          this.questions = data;
        })
        .catch(err => console.error(err));
    },

    selectAnswer(questionOrder, option, type, event) {
      const buttons = event.currentTarget.closest(".options").querySelectorAll(".option-btn");

      if (type === "single-choice") {
        // 单选题：取消所有按钮高亮，仅选中当前
        buttons.forEach(btn => btn.classList.remove("selected"));
        event.currentTarget.classList.add("selected");
        this.$set(this.answers, questionOrder, option);
      } else if (type === "multiple-choice") {
        // 多选题：切换当前按钮高亮状态
        const current = this.answers[questionOrder] || [];
        const index = current.indexOf(option);

        if (index === -1) {
          current.push(option);
          event.currentTarget.classList.add("selected");
        } else {
          current.splice(index, 1);
          event.currentTarget.classList.remove("selected");
        }

        this.$set(this.answers, questionOrder, current);
      }
    },

    handleSubmit() {
      // 直接生成提交数据，无需检测所有题目是否回答
      const payload = [];

      this.questions.forEach(q => {
        const answer = this.answers[q.order];
        if (Array.isArray(answer)) {
          // 多选题：每个选项单独生成一条记录
          answer.forEach(opt => {
            payload.push({ option: opt, order: q.order });
          });
        } else {
          payload.push({ option: answer, order: q.order });
        }
      });

      fetch("http://localhost:5000/api/mbtiquiz/validate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(result => {
          console.log("✅ 服务器返回：", result);
          alert("提交成功！请查看控制台返回结果");
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

<style scoped>
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
  max-width: 600px;
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
</style>
