<template>
  <div class="feedback-container">
    <h1>Quiz Feedback</h1>
    <div v-if="feedbackList.length === 0">
      <p>No feedback available. Please submit the quiz first.</p>
      <!-- 可选：提供一个返回链接 -->
      <router-link to="/cz-quiz">Go back to quiz</router-link>
    </div>
    <div v-else>
      <div
        v-for="(feedback, index) in feedbackList"
        :key="feedback.question_order"
        class="feedback-item"
      >
        <h2>Question {{ feedback.question_order }}</h2>
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
</template>

<script>
export default {
  name: "CzFeedback",
  data() {
    return {
      feedbackList: []
    };
  },
  mounted() {
    // 检查路由 state 中是否传递了反馈数据
    if (this.$route && this.$route.state && this.$route.state.feedback) {
      this.feedbackList = this.$route.state.feedback;
    } else {
      console.warn("No feedback data provided via route state.");
      // 如果确实需要，也可以在这里选择发起 GET 请求，但前提是后端提供 GET 接口
      // this.fetchFeedback();
    }
  },
  methods: {
    // 如果后端提供 GET 接口时，可以用 fetchFeedback 方法获取数据
    fetchFeedback() {
      fetch("https://fit5120mainprojecttp20backend.onrender.com/api/mbtiquiz/validate-answers")
        .then(res => res.json())
        .then(data => {
          this.feedbackList = data;
        })
        .catch(err => console.error("Error fetching feedback:", err));
    }
  }
};
</script>

<style scoped>
.feedback-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.feedback-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
}

.feedback-item h2 {
  margin-top: 0;
  color: #333;
}
</style>
