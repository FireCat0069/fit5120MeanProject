<template>
  <div class="quiz-container">
    <div class="quiz-page">
          <!-- Left navigation sidebar -->
          <div class="first-section">
              <div class="navbar-brand">DigiWise</div>
              <nav class="nav-links">
                <router-link 
                  to="/Quiz-Content" 
                  class="nav-item active-nav-item" 
                >
                  Dashboard
                </router-link>
                <router-link to="/quiz-bank" class="nav-item">Quiz Bank</router-link>
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
      
              <!-- Main quiz container -->
              <div class="quiz-section">
                  <!-- Quiz title section -->
                  <div class="quiz-section-1">
                    <h1 class="quiz-title">Protecting the Organisation</h1>
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
                  <!-- Progress indicator section -->
                  <div class="quiz-section-3"> 
                    <div class="quiz-progress">
                      Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}
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
    quizTitle: "",
    quizData: [], // Raw API data
    questions: [], // Processed questions
    currentQuestionIndex: 0,
    selectedOption: null,
    userAnswers: [],
    CorrectAnswer: [],
    IsCorrect: ""
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
  await this.fetchQuestions()
},
methods: {
    async fetchQuestions() {
      try {
        // Fetch questions from API
        const response = await fetch('api/quiz/questions')
        this.quizData = await response.json()
        this.processQuestions()
      } catch (error) {
        console.error('Failed to fetch questions:', error)
      }
    },
    processQuestions() {
    // Shuffle questions and select first 10
    const shuffledQuestions = [...this.quizData]
      .map(a => ({ sort: Math.random(), value: a })) // Add random sort value
      .sort((a, b) => a.sort - b.sort) // Sort by random value
      .map(a => a.value) // Extract original values
      .slice(0, 10); // Take first 10

    // Process question format
    this.questions = shuffledQuestions.map(item => {
      // Process options (split string if needed)
      const optionsString = item.Options[0];
      const options = optionsString.split(';').map(opt => opt.trim());
      
      // Determine question type and process correct answers
      const isMultipleChoice = item['QuizType'] === 'Multiple Choice';
      let correctIndices;
      
      if (isMultipleChoice) {
        // For multiple choice: split answers like "A,B" or "AB"
        correctIndices = item['CorrectAnswer'].split(/[, ]*/)
          .map(char => char.charCodeAt(0) - 65);
      } else {
        // For single choice: convert single letter to index
        correctIndices = [item['CorrectAnswer'].charCodeAt(0) - 65];
      }

      return {
        id: item._id,
        text: item.Question,
        options: options,
        correctIndices: correctIndices, // Always array (even for single choice)
        isMultipleChoice: isMultipleChoice,
        quizType: item['QuizType'] // Store original type for reference
      };
    });

    // Initialize userAnswers - arrays for MC, null for SC
    this.userAnswers = this.questions.map(q => 
      q.isMultipleChoice ? [] : null
    );
  },

  selectOption(index) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    
    if (currentQuestion.isMultipleChoice) {
      // Multiple choice logic
      const currentAnswers = [...(this.userAnswers[this.currentQuestionIndex] || [])];
      const answerIndex = currentAnswers.indexOf(index);
      
      if (answerIndex === -1) {
        // Add selection
        currentAnswers.push(index);
      } else {
        // Remove selection
        currentAnswers.splice(answerIndex, 1);
      }
      
      // Update state with sorted indices
      this.userAnswers[this.currentQuestionIndex] = currentAnswers.sort((a, b) => a - b);
      this.selectedOption = [...currentAnswers]; // Create a new array For UI binding
    } else {
      // Single choice logic
      this.userAnswers[this.currentQuestionIndex] = index;
      this.selectedOption = index;
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      // Restore previous answer (could be array or null)
      this.selectedOption = this.userAnswers[this.currentQuestionIndex];
    }
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      // Load current answer (array or null)
      this.selectedOption = this.userAnswers[this.currentQuestionIndex];
    } else {
      this.submitQuiz();
    }
  },

  async submitQuiz() {
    try {
      // Prepare answer data in the exact format the API expects
      const answers = this.questions.map((question, index) => {
        const userAnswer = this.userAnswers[index];
        
        // Convert user's answer to letter format (A, B, C, etc.)
        let selectedOption = '';
        
        if (question.isMultipleChoice && Array.isArray(userAnswer)) {
          // Multiple choice: convert to "A,B,C" format
          selectedOption = userAnswer
            .sort((a, b) => a - b) // Ensure consistent order
            .map(idx => String.fromCharCode(65 + idx))
            .join(',');
        } else if (!question.isMultipleChoice && typeof userAnswer === 'number') {
          // Single choice: convert to single letter
          selectedOption = String.fromCharCode(65 + userAnswer);
        }

        return {
          _id: question.id, // Use _id instead of questionId to match API
          selectedOption: selectedOption || 'A' // Default to 'A' if empty
        };
      });

      // Submit to server
      const response = await fetch('api/quiz/validate-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers) // Send the array directly without wrapping
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      (result => {
          console.log("✅ 服务器返回：", result);
          // 保存反馈数据，并显示反馈视图
          this.CorrectAnswer = result.correctAnswer;
          this.IsCorrect = result.IsCorrect;
        })
      
      // Handle result - adjust based on your API's actual response
      if (result.score !== undefined) {
        // Optionally navigate to FeedBack page
        this.$router.push('/Quiz-Feedback');
      } else {
        alert('Quiz submitted successfully!');
      }

      return result;
      
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit quiz. Please try again.');
      throw error; // Re-throw if you want calling code to handle it
    }
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

/* Quiz section 1 (title) */
.quiz-section-1 {
flex: 1;
}

/* Quiz section 2 (questions) */
.quiz-section-2 {
flex: 2;
display: flex;
justify-content: center;
align-items: center;
}

/* Quiz section 3 (progress) */
.quiz-section-3 {
flex: 1;
display: flex;
justify-content: flex-end;
align-items: flex-start;
}

/* Progress indicator */
.quiz-progress {
font-size: 1rem;
color: #c65209;
font-weight: 600;
border-radius: 20px;
}

/* Quiz title */
.quiz-title {
font-size: 1rem;
color: #c65209;
font-weight: 600;
}

/* Question content container */
.question-content {
  max-width: 600px;
  width: 100%;
  margin-top: 15%;
}

/* Question index styling */
.quiz-section-2 h1 {
  font-size: 1.5rem; 
  text-align: center; 
  margin-bottom: 2rem;
}

/* Question text styling */
.question-text {
font-size: 1rem;
color: #333;
margin-bottom: 2rem;
}

/* Options list styling */
.options-list {
list-style: none;
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 1fr;
gap: 0.8rem;
}

/* Option item styling */
.options-list li {
padding: 1rem;
background-color: #fff;
border: 1px solid #e0e0e0;
border-radius: 6px;
cursor: pointer;
transition: all 0.2s ease;
}

/* Option hover state */
.options-list li:hover {
border-color: #c65209;
background-color: #fff8f5;
}

/* Selected option styling */
.options-list li.selected {
background-color: #c65209;
color: white;
border-color: #c65209;
}

/* Navigation buttons container */
.quiz-navigation {
display: flex;
justify-content: space-between;
margin-top: 2rem;
padding-top: 1.5rem;
border-top: 1px solid #eee;
}

/* Base button styling */
.nav-btn {
padding: 0.8rem 2rem;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 1rem;
}

/* Previous button */
.prev-btn {
background-color: #f5f5f5;
color: #333;
}

/* Next button */
.next-btn {
background-color: #c65209;
color: white;
}

/* Disabled button state */
.nav-btn:disabled {
opacity: 0.5;
cursor: not-allowed;
}
</style>