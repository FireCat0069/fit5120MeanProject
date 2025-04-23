<template>
  <div class="feedback-container">
    <h1>Quiz Feedback</h1>
    <div v-if="!feedback || feedback.length === 0">
      <p>No feedback available.</p>
    </div>
    <div v-else>
      <div
        v-for="item in feedback"
        :key="item.question_order"
        class="feedback-item"
      >
        <h2>Question {{ item.question_order }}</h2>
        <p>
          <strong>Correct Answer:</strong>
          {{ item.correctAnswer }}
        </p>
        <p>
          <strong>Your Answer:</strong>
          <span v-if="item.isCorrect === null">Not answered</span>
          <span v-else-if="item.isCorrect">Correct</span>
          <span v-else>Incorrect</span>
        </p>
        <p>
          <strong>Explanation:</strong>
          {{ item.explanation }}
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
      feedback: []
    };
  },
  created() {
    // 获取通过路由 state 传递的 feedback 数据
    const routeState = this.$route && this.$route.state;
    this.feedback = (routeState && routeState.feedback) || [];
  }
};
</script>

<style scoped>
.feedback-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.feedback-item {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fefefe;
}

.feedback-item h2 {
  margin-top: 0;
  font-size: 20px;
  color: #333;
}

.feedback-item p {
  margin: 8px 0;
  font-size: 16px;
  color: #555;
}

.feedback-item strong {
  color: #000;
}
</style>
