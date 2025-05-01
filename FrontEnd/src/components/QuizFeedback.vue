<template>
  <div class="quiz-container">
    <div class="quiz-page">
      <!-- Left navigation sidebar -->
      <div class="first-section">
        <div class="navbar-brand">DigiWise</div>
        <nav class="nav-links">
          <router-link to="/Quiz-Content-i1" class="nav-item">Dashboard</router-link>
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
          <span>Protecting the Organisation</span>
        </div>

        <!-- Feedback Area -->
        <div class="quiz-section">
          <!-- Quiz title section -->
          <div class="quiz-section-1">
            <h1 class="quiz-title">Protecting the Organisation</h1>
          </div>
          
          <!-- Main Feedback Content -->
          <div class="feedback-section" v-if="quizResults">
            <div class="feedback-header">
              <h1 class="feedback-title">Quiz Results</h1>
              <div class="score-display">
                <div class="score-circle">
                  {{ quizResults.score }}/{{ quizResults.questions.length }}
                </div>
                <div class="score-percentage">
                  {{ calculatePercentage() }}%
                </div>
              </div>
            </div>
            
            <!-- Feedback List -->
            <div class="quiz-feedback">
              <div 
                v-for="(detail, index) in quizResults.details" 
                :key="index" 
                class="feedback-card"
                :class="{ 'correct': detail.isCorrect, 'incorrect': !detail.isCorrect }"
              >
                <div class="question-header">
                  <h3 class="question-index">Question {{ index + 1 }}</h3>
                  <span class="status-badge">
                    {{ detail.isCorrect ? '✓ Correct' : '✗ Incorrect' }}
                  </span>
                </div>
                
                <p class="question-text">{{ getQuestionText(index) }}</p>
                
                <div class="answer-row">
                  <span class="answer-label">Your Answer:</span>
                  <span class="answer-value">{{ formatAnswer(detail.selectedOption) }}</span>
                </div>
                
                <div class="answer-row" v-if="!detail.isCorrect">
                  <span class="answer-label">Correct Answer:</span>
                  <span class="answer-value">{{ getCorrectAnswer(index) }}</span>
                </div>
                
                <div class="explanation" v-if="detail.explanation">
                  <span class="answer-label">Explanation:</span>
                  <span class="answer-value">{{ detail.explanation }}</span>
                </div>
              </div>
            </div>
            
            <div class="action-buttons">
              <router-link to="/quiz-bank-i1&i2" class="retake-btn">
                Take Another Quiz
              </router-link>
              <router-link to="/Quiz-Content-i1" class="dashboard-btn">
                Back to Dashboard
              </router-link>
            </div>
          </div>

          <!-- Loading/Error States -->
          <div v-if="loading" class="status-message loading">
            <div class="spinner"></div>
            Loading your results...
          </div>
          <div v-if="error" class="status-message error">
            <span class="error-icon">⚠️</span>
            Error loading results. Please try again.
          </div>
          <div v-if="!loading && !quizResults" class="status-message empty">
            <span class="empty-icon">📝</span>
            No quiz results found. Please complete a quiz first.
            <router-link to="/quiz-bank-i1&i2" class="take-quiz-link">
              Take a Quiz Now
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Reactive data
const quizResults = ref(null);
const loading = ref(true);
const error = ref(null);

// Helper methods
const getQuestionText = (index) => {
  return quizResults.value?.questions[index]?.text || 'Question not available';
};

const formatAnswer = (answer) => {
  if (!answer) return 'No answer provided';
  if (Array.isArray(answer)) {
    return answer.map(a => String.fromCharCode(65 + a)).join(', ');
  }
  return String.fromCharCode(65 + answer);
};

const getCorrectAnswer = (index) => {
  const question = quizResults.value?.questions[index];
  if (!question?.correctIndices) return 'Not available';
  
  if (Array.isArray(question.correctIndices)) {
    return question.correctIndices.map(idx => String.fromCharCode(65 + idx)).join(', ');
  }
  return String.fromCharCode(65 + question.correctIndices);
};

const calculatePercentage = () => {
  if (!quizResults.value) return 0;
  return Math.round((quizResults.value.score / quizResults.value.questions.length) * 100);
};

// Load results
onMounted(() => {
  try {
    const stored = sessionStorage.getItem('quizResults');
    if (stored) {
      quizResults.value = JSON.parse(stored);
      console.log("Loaded results:", quizResults.value);
      
      // Ensure details array exists and has isCorrect property
      if (quizResults.value.details) {
        quizResults.value.details.forEach(detail => {
          if (detail.correct === undefined && detail.isCorrect === undefined) {
            detail.isCorrect = false; // Default to incorrect if not specified
          } else if (detail.correct !== undefined) {
            detail.isCorrect = detail.correct; // Map old correct property to isCorrect
          }
        });
      }
    }
  } catch (e) {
    error.value = "Failed to load results";
    console.error("Error parsing quiz results:", e);
  } finally {
    loading.value = false;
  }
});
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

.nav-item.active-nav-item {
  background-color: #ea3f06;
  color: white;
}

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

.search-input { 
  padding: 0.5rem 1rem;
  border: 1px solid #ddd; 
  border-radius: 5px; 
  width: 100%; 
  font-size: 1rem; 
} 

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

.quiz-title {
  font-size: 1rem;
  color: #c65209;
  font-weight: 600;
}

/* Quiz section 1 (title) */
.quiz-section-1 {
  width: 20%;
}

/* Feedback section */
.feedback-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.feedback-header {
  text-align: center;
  margin-bottom: 2rem;
}

.feedback-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.score-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #c65209;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.score-percentage {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

/* Feedback card styling */
.feedback-card {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 4px solid #ddd;
}

.feedback-card.correct {
  border-left-color: #4CAF50;
  background-color: #f8fff8;
}

.feedback-card.incorrect {
  border-left-color: #F44336;
  background-color: #fff8f8;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.question-index {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.feedback-card.correct .status-badge {
  background-color: #4CAF50;
  color: white;
}

.feedback-card.incorrect .status-badge {
  background-color: #F44336;
  color: white;
}

.question-text {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
}

.answer-row {
  display: flex;
  margin-bottom: 0.5rem;
}

.answer-label {
  font-weight: bold;
  min-width: 120px;
  color: #666;
}

.answer-value {
  color: #333;
}

.explanation {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #ddd;
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.retake-btn, .dashboard-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.retake-btn {
  background-color: #c65209;
  color: white;
}

.dashboard-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.retake-btn:hover {
  background-color: #a84307;
}

.dashboard-btn:hover {
  background-color: #e0e0e0;
}

/* Status messages */
.status-message {
  padding: 2rem;
  text-align: center;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.status-message.loading {
  color: #666;
}

.status-message.error {
  color: #F44336;
}

.status-message.empty {
  color: #666;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #c65209;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon, .empty-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.take-quiz-link {
  margin-top: 1rem;
  color: #c65209;
  text-decoration: none;
  font-weight: bold;
}

.take-quiz-link:hover {
  text-decoration: underline;
}
</style>