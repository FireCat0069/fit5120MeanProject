<template>
  <div class="quiz-container">
    <h1>MBTI Quiz</h1>
    <div v-if="questions.length > 0">
      <div v-for="(question, index) in questions" :key="index" class="question-block">
        <h2>Question {{ question.question_order }}: {{ question.question }}</h2>
        <div v-for="option in question.options" :key="option">
          <label>
            <input
              type="radio"
              :name="'q' + question.question_order"
              :value="option"
              v-model="userAnswers[question.question_order]"
            />
            {{ option }}
          </label>
        </div>
      </div>
      <button @click="submitQuiz">Submit Quiz</button>
    </div>
    <div v-else>
      <p>Loading questions...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "CzQuiz",
  data() {
    return {
      questions: [],
      userAnswers: {}  // { 1: "A", 2: "C", ... }
    };
  },
  mounted() {
    axios.get("https://fit5120mainprojecttp20backend.onrender.com/api/mbtiquiz/questions")
      .then(res => {
        this.questions = res.data;
      })
      .catch(err => console.error("Failed to load questions", err));
  },
  methods: {
  /**
 * Submits the user's MBTI quiz answers to the backend for validation.
 *
 * Functionality:
 * - Iterates over the user's selected answers stored in `userAnswers`.
 * - Converts the answers into an array of objects, each containing:
 *   - `question_order`: the question index (as a number).
 *   - `option`: the selected answer option.
 * - Sends a POST request with the answer array to the backend validation API.
 * - On success, navigates to the feedback page (`/cz-feedback`) and passes the
 *   response data as state for rendering personalized feedback.
 * - Logs any errors that occur during submission.
 *
 * Usage:
 * - Called when the user submits the quiz, typically via a "Submit" button.
 */

    submitQuiz() {
      const answerArray = [];

      for (const question_order in this.userAnswers) {
        answerArray.push({
          question_order: Number(question_order),
          option: this.userAnswers[question_order]
        });
      }

      axios.post("https://fit5120mainprojecttp20backend.onrender.com/api/mbtiquiz/validate-answers", answerArray)
        .then(res => {
          this.$router.push({
            path: "/cz-feedback",
            state: {
              feedback: res.data
            }
          });
        })
        .catch(err => {
          console.error("Failed to submit quiz", err);
        });
    }
  }
};
</script>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.question-block {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fefefe;
}
</style>
