<template>
    <div class="quiz-container">
      <div class="quiz-page">
        <!-- Left navigation sidebar -->
        <div class="first-section">
          <div class="navbar-brand">DigiWise</div>
          <nav class="nav-links">
            <router-link to="/Quiz-Content" class="nav-item">Dashboard</router-link>
            <router-link to="/quiz-bank" class="nav-item">Quiz Bank</router-link>
          </nav>
        </div>
  
        <!-- Right content area -->
        <div class="main-section">
          <!-- Breadcrumb navigation -->
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
  
          <!-- FeedBack Area -->
          <div class="quiz-section">
                  <!-- Quiz title section -->
                  <div class="quiz-section-1">
                    <h1 class="quiz-title">Protecting the Organisation</h1>
                  </div>
                  <div class="feedback-section">
                        <div class="feedback-header">
                            <h1 class="feedback-title">Quiz Results</h1>
                            <!-- Score -->
                            <div class="score-summary">
                                Your Score: {{ score }}
                            </div>
                        </div>
                        
            
                        <!-- Feedback List -->
                        <div class="results-list">
                            <div 
                                v-for="(result, index) in results" 
                                :key="index"
                                class="result-item"
                                :class="{ 'correct': result.isCorrect, 'incorrect': !result.isCorrect }"
                            >
                                <div class="question-header">
                                <h3 class="question-Index">Question {{ index + 1 }}</h3>
                                <span class="status-badge">
                                    {{ result.isCorrect ? '✓ Correct' : '✗ Incorrect' }}
                                </span>
                                </div>
                                
                                <p class="question-text">{{ getQuestionText(result.questionId) }}</p>
                                
                                <div class="answer-row">
                                <span class="answer-label">Your Answer:</span>
                                <span class="answer-value">{{ result.userAnswer || 'No answer' }}</span>
                                </div>
                                
                                <div class="answer-row">
                                <span class="answer-label">Correct Answer:</span>
                                <span class="answer-value">{{ result.correctAnswer }}</span>
                                </div>
                            </div>
                        </div>
                  </div>
            </div>
       </div>
    </div>
</div>
  </template>



  
<script>
  export default {
    data() {
      return {
        currentFeedbackIndex: 0,
        results: [], // Store the result from the backend
        questions: [] // Store the question from the users have answers before
      }
    },
    computed: {
      correctCount() {
        return this.results.filter(r => r.isCorrect).length;
      }
    },
    async created() {
      await this.loadResults();
    },
    methods: {
      async loadResults() {
        try {
          // Get the result from sessionStorage
          const savedResults = JSON.parse(sessionStorage.getItem('quizResults'));
          
          if (savedResults) {
            this.results = savedResults.details;
            this.questions = savedResults.questions;
            this.score = savedResults.score;
          } 
        } catch (error) {
          console.error('Failed to load results:', error);
        }
      },
      
      getQuestionText(questionId) {
        const question = this.questions.find(q => q.id === questionId);
        return question ? question.text : 'Question not available';
      }
    }
  }
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

/* Responsive sizing */
width: 90vw;          /* 90% of viewport width */
max-width: 1400px;    /* Maximum width for desktop */
height: 80vh;         /* 80% of viewport height */
max-height: 650px;    /* Maximum height for desktop */

/* Scroll handling */
overflow: auto;

/* Center alignment */
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
  min-width: 250px; /* Minimum width */
  max-width: 300px; /* Maximum width */
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


/* Active navigation item */
.nav-item.active-nav-item {
  background-color: #ea3f06 ;
  color: white ;
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

.quiz-title {
font-size: 1rem;
color: #c65209;
font-weight: 600;
}

/* Quiz section 1 (title) */
.quiz-section-1 {
    width: 20%;
}

/* Quiz section 2 (questions) */
.feedback-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.feedback-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.feedback-title{
    font-size: 3rem;
    color: #c65209;
    font-weight: 600;
    text-align: center; 
}




.score-summary {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 2rem;
  text-align: center;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.question-Index {
  font-size:  1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 12px;
  text-align: left;
}



.results-list {
  margin-top: 1rem;
}

.result-item {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #ccc;
}

.question-text {
font-size: 1.1rem;
color: #333;
margin-bottom: 2rem;
}

.answer-row {
  display: flex;
  margin-bottom: 0.5rem;
}

.answer-label {
  font-size: 0.9rem;
  font-weight: bold;
  min-width: 120px;
  color: #666;
}

.answer-value {
  font-size: 0.9rem;
  flex-grow: 1;
}

.correct {
  border-left-color: #4CAF50;
  background-color: #f8fff8;
}

.incorrect {
  border-left-color: #F44336;
  background-color: #fff8f8;
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.correct .status-badge {
  background-color: #4CAF50;
  color: white;
}

.incorrect .status-badge {
  background-color: #F44336;
  color: white;
}
</style>