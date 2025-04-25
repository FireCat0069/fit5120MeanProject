<template>
  <div class="quizbank-container" @touchmove.prevent>
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">DigiWise</div>
      <nav class="nav">
        <router-link
          to="/"
          class="nav-item"
          :class="{ active: $route.path === '/' }"
        >
          Dashboard
        </router-link>
        <router-link
          to="/info-hub"
          class="nav-item"
          :class="{ active: $route.path === '/info-hub' }"
        >
          Info Hub
        </router-link>
        <router-link
          to="/quiz-bank"
          class="nav-item"
          :class="{ active: $route.path === '/quiz-bank' }"
        >
          Quiz Bank
        </router-link>
      </nav>
    </aside>

    <!-- Main Area -->
    <main class="main-area">
      <!-- Search Bar -->
      <div class="search-bar">
        <input
          type="text"
          placeholder="Search Quiz"
          class="search-input"
        />
        <button class="search-button">Search</button>
      </div>

      <!-- Quiz Cards with fade-in on mount and enter -->
      <transition-group
        name="fade"
        tag="div"
        class="card-wrapper"
        appear
      >
        <div
          class="quiz-card"
          v-for="(quiz, index) in quizzes"
          :key="index"
        >
          <div class="card-content">
            <img
              class="quiz-img"
              src="@/assets/quiz1.png"
              alt="Quiz"
            />
            <p class="category-text">{{ quiz.category }}</p>
            <p class="quiz-name">{{ quiz.title }}</p>
            <div class="divider"></div>
            <p class="quiz-meta">{{ quiz.meta }}</p>

            <!-- 第一张卡片：Start Quiz 导航至 /Quiz-Introduction -->
            <router-link
              v-if="index === 0"
              to="/Quiz-Introduction"
            >
              <button class="start-quiz-btn">
                Start Quiz
              </button>
            </router-link>

            <!-- 其他卡片：普通按钮 -->
            <button
              v-else
              class="start-quiz-btn"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </transition-group>
    </main>
  </div>
</template>

<script>
export default {
  name: "QuizBank",
  data() {
    return {
      quizzes: [
        {
          category: "Online Safety",
          title: "Can You Outsmart the Internet Threats?",
          meta: "15 mins · 34 questions · 521 times",
        },
        {
          category: "Digital Literacy",
          title: "Think Before You Click",
          meta: "12 mins · 25 questions · 780 times",
        },
        {
          category: "Fact-Checking",
          title: "Spot the Fake News",
          meta: "10 mins · 20 questions · 601 times",
        },
        {
          category: "Social Media",
          title: "How Mindful is Your Scrolling?",
          meta: "18 mins · 30 questions · 460 times",
        },
      ],
    };
  },
  mounted() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  },
  unmounted() {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  },
};
</script>

<style scoped>
.quizbank-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: #fbf9f9;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 16vw;
  background-color: white;
  padding: 24px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #f97316;
  margin-bottom: 40px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-item {
  font-size: 16px;
  color: #1d1d1d;
  text-decoration: none;
  cursor: pointer;
}

.nav-item.active {
  font-weight: bold;
}

.main-area {
  flex: 1;
  height: 90vh; /* 为底部按钮预留10vh */
  padding: 30px 40px 10px 40px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fbf9f9;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 6px;
}

.search-button {
  margin-left: 16px;
  padding: 10px 24px;
  background-color: #ff7426;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #e65f14;
}

/* Card Grid */
.card-wrapper {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  height: calc(90vh - 110px); /* 减去搜索栏和 padding */
  overflow-y: auto;
  scrollbar-width: none;
}
.card-wrapper::-webkit-scrollbar {
  display: none;
}

/* Quiz Card */
.quiz-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
}

.quiz-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.category-text {
  font-size: 14px;
  color: #acacac;
  margin-bottom: 4px;
}

.quiz-name {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 6px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
}

.quiz-meta {
  font-size: 13px;
  color: #4a4a4a;
  margin-bottom: 12px;
}

.start-quiz-btn {
  background-color: #ff7426;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: bold;
  align-self: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.start-quiz-btn:hover {
  background-color: #e65f14;
}

/* Fade & Appear Animations */
.fade-enter-active,
.fade-appear-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.fade-enter-from,
.fade-appear-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to,
.fade-appear-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
