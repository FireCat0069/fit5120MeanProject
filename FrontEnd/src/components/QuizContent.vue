<template>
  <div class="quiz-container">
    <div class="quiz-page">
      <!-- Left navigation sidebar -->
      <div class="first-section">
        <div class="navbar-brand">DigiWise</div>
        <nav class="nav-links">
          <router-link to="/" class="nav-item">Dashboard</router-link>
          <router-link to="/quiz-bank-i1&i2" class="nav-item">Quiz Bank</router-link>
        </nav>
      </div>
      <!-- Right content area -->
      <div class="main-section">

        <!-- Search bar -->
        <div class="navbar-search">
          <input type="text" placeholder="Search Quiz" class="search-input">
          <button class="search-button">Search</button>
        </div>

        <!-- Breadcrumb navigation -->
        <div class="breadcrumb">
          <span>Dashboard</span> /
          <span>Schedule Quizzes</span> /
          <span>{{ sectionName }}</span>
        </div>

        <!-- Main quiz container -->
        <div class="quiz-section">
          <!-- Quiz title section -->
          <div class="quiz-section-1">
            <h1 class="quiz-title">{{ sectionName }}</h1>
          </div>

          <!-- Question content section -->
          <div class="quiz-section-2">
            <div class="question-content">
              <h1 class="question-index">
                Question {{ currentQuestionIndex + 1 }}
                <span v-if="currentQuestion.isMultipleChoice"> (Multiple Choice)</span>
                <span v-else> (Single Choice)</span>
              </h1>
              <h2 class="question-text">{{ currentQuestion.text }}</h2>

              <!-- Options list -->
              <ul class="options-list">
                <li
                  v-for="(option, index) in currentQuestion.options"
                  :key="index"
                  @click="selectOption(index)"
                  :class="{
                    'selected': currentQuestion.isMultipleChoice
                                ? selectedOption.includes(index)
                                : selectedOption === index
                  }"
                >
                  {{ option }}
                </li>
              </ul>

              <!-- Navigation buttons -->
              <div class="quiz-navigation">
                <button
                  class="nav-btn prev-btn"
                  @click="prevQuestion"
                  :disabled="currentQuestionIndex === 0"
                >
                  Previous
                </button>
                <button
                  class="nav-btn next-btn"
                  @click="nextQuestion"
                  :disabled="selectedOption === null"
                >
                  {{ isLastQuestion ? 'Submit' : 'Next' }}
                </button>
              </div>
            </div>
          </div>
          <!-- Progress and Full Marks Count section -->
          <div class="quiz-section-3">
            <div class="quiz-progress">
              Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}
            </div>
            <div class="pass-count">
              Full marks achieved: {{ passCount }} times
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { setQuizScore, getPassCount } from '../../localS/storage.js';

export default {
  data() {
    return {
      quizTitle: "",
      quizData: [], // Raw API data
      questions: [], // Processed questions
      currentQuestionIndex: 0,
      selectedOption: null,
      userAnswers: [],
      sectionName: '',
      passCount: 0 // Count of full-score attempts
    }
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex] || {}
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.questions.length - 1
    }
  },

  async created() {
    this.sectionName = this.$route.query.section || 'Default Section';
    console.log('Section from URL:', this.sectionName);
    await this.fetchQuestions();
  },

  mounted() {
    // Initialize full-mark count from storage
    this.passCount = getPassCount(this.sectionName);
  },

  methods: {
    async fetchQuestions() {
      try {
        // Fetch questions from API
        const response = await fetch('https://fit5120mainprojecttp20backend.onrender.com/api/quiz/questions');
        this.quizData = await response.json();
        this.processQuestions();
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    },

    processQuestions() {
      if (!Array.isArray(this.quizData)) {
        console.error('quizData is not an array:', this.quizData);
        return;
      }

      const filteredQuestions = this.quizData.filter(item => item.section === this.sectionName);
      if (filteredQuestions.length === 0) {
        console.error('No questions found for section:', this.sectionName);
        return;
      }

      // Process each question
      this.questions = filteredQuestions.map(item => {
        const options = item.options.split(';').map(opt => opt.trim());
        const isMultipleChoice = item['quiztype'] === 'Multiple Choice';
        const correctIndices = isMultipleChoice
          ? item['correctanswer'].split(/[, ]*/).map(char => char.charCodeAt(0) - 65)
          : [item['correctanswer'].charCodeAt(0) - 65];

        return {
          text: item.question,
          options,
          correctIndices,
          isMultipleChoice,
          quizType: item['quiztype']
        };
      });

      // Initialize answers
      this.userAnswers = this.questions.map(q => q.isMultipleChoice ? [] : null);
    },

    selectOption(index) {
      const current = this.questions[this.currentQuestionIndex];
      if (current.isMultipleChoice) {
        const answers = [...(this.userAnswers[this.currentQuestionIndex] || [])];
        const i = answers.indexOf(index);
        if (i === -1) answers.push(index);
        else answers.splice(i, 1);
        this.userAnswers[this.currentQuestionIndex] = answers.sort((a,b) => a-b);
        this.selectedOption = [...answers];
      } else {
        this.userAnswers[this.currentQuestionIndex] = index;
        this.selectedOption = index;
      }
    },

    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.selectedOption = this.userAnswers[this.currentQuestionIndex];
      }
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedOption = this.userAnswers[this.currentQuestionIndex];
      } else {
        this.submitQuiz();
      }
    },

    async submitQuiz() {
      try {
        // Prepare submission data
        const submissionData = this.quizData
          .filter(item => item.section === this.sectionName)
          .map((orig, idx) => {
            const ans = this.userAnswers[idx];
            let selectedOption = '';
            if (Array.isArray(ans)) {
              selectedOption = ans.map(i => String.fromCharCode(65 + i)).join(',');
            } else if (typeof ans === 'number') {
              selectedOption = String.fromCharCode(65 + ans);
            }
            return { ...orig, selectedOption: selectedOption || 'A' };
          });

        // Submit to server
        const response = await fetch(
          'https://fit5120mainprojecttp20backend.onrender.com/api/quiz/validate-answers',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData)
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ The server returned:", result);

        const quizResults = {
          score: result.filter(r => r.isCorrect).length,
          details: result,
          sectionName: this.sectionName,
          questions: this.questions.map((q, i) => ({ id: i, text: q.text }))
        };
        console.log('QuizResults before storage:', quizResults);

        // Save score to localStorage
        setQuizScore(this.sectionName, quizResults.score);
        // Update full-score count display
        this.passCount = getPassCount(this.sectionName);

        // 原有逻辑：保存到 sessionStorage 并导航
        sessionStorage.setItem('quizResults', JSON.stringify(quizResults));
        this.$router.push('/Quiz-Feedback');

        // Compatibility check
        if (result.score !== undefined) {
          this.$router.push('/Quiz-Feedback');
        } else {
          alert('Quiz submitted successfully!');
        }

        return result;
      } catch (error) {
        console.error('Submission failed:', error);
        alert('Failed to submit quiz. Please try again.');
        throw error;
      }
    }
  }
};
</script>

<style scoped>
/* Main container - fixed fullscreen layout */
.quiz-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}

/* Quiz section styling */
.quiz-section {
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 90vw;
  max-width: 1400px;
  height: 80vh;
  max-height: 650px;
  overflow: auto;
  margin: 0 auto;
}

/* Page layout */
.quiz-page {
  height: 100%;
  display: flex;
}

/* Left sidebar styling */
.first-section {
  width: 20%;
  min-width: 250px;
  max-width: 300px;
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 1.5rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

/* Brand logo styling */
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #c65209;
  margin-right: auto;
  margin-left: 1rem;
  margin-top: 1.2rem;
  margin-bottom: 3.5rem; 
}

/* Navigation links */
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0;
}

/* Navigation items */
.nav-item {
  text-decoration: none;
  color: #1D1D1D;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
}

/* Navigation hover effect */
.nav-item:hover {
  background-color: #ea3f06;
}

/* Main content area */
.main-section {
  flex: 1;
  padding: 2rem;
  height: 100vh;
  background-color: #f5f5f5;
}

/* Search bar layout */
.navbar-search {
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: none;
}

/* Search input field */
.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
}

/* Search button */
.search-button {
  padding: 0.5rem 3rem;
  background-color: #ea3f06;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  white-space: nowrap;
}

/* Search button hover */
.search-button:hover {
  background-color: #a84307;
}

/* Breadcrumb navigation */
.breadcrumb {
  font-size: 0.9rem;
  color: #6d6b6b;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.breadcrumb span {
  color: #6d6b6b;
  cursor: pointer;
}

/* Quiz layout sections */
.quiz-section-1 { flex: 1; }
.quiz-section-2 { flex: 2; display: flex; justify-content: center; align-items: center; }
.quiz-section-3 { flex: 1; display: flex; justify-content: space-between; align-items: flex-start; }

/* Progress indicator */
.quiz-progress {
  font-size: 1rem;
  color: #c65209;
  font-weight: 600;
  border-radius: 20px;
}

/* Pass count display */
.pass-count {
  font-size: 0.9rem;
  color: #333;
  margin-top: 0.5rem;
  font-weight: 500;
}

/* Quiz title */
.quiz-title {
  font-size: 1rem;
  color: #c65209;
  font-weight: 600;
}

/* Question content */
.question-content {
  max-width: 600px;
  width: 100%;
  margin-top: 15%;
}
.question-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 2rem;
}

/* Options list */
.options-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;
}
.options-list li {
  padding: 1rem;
  background-color: #fff;
  color: #1D1D1D;
  border: 1px solid #000000;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.options-list li:hover {
  border-color: #c65209;
  background-color: #fff8f5;
}
.options-list li.selected {
  background-color: #c65209;
  color: rgb(255, 255, 255);
  border-color: #c65209;
}

/* Navigation buttons */
.quiz-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}
.nav-btn {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
.prev-btn { background-color: #f5f5f5; color: #333; }
.next-btn { background-color: #c65209; color: white; }
.nav-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>