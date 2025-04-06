<template>
  <!-- 第一屏 -->
  <div class="page-container first-section">
    <div class="nav-bar">
      <span>Home</span>
      <router-link to="/quiz-bank" class="nav-link">Quiz Bank</router-link>
      <span>Contact us</span>
    </div>

    <div class="main-title">
      <div>
        <span class="title-black">Digital Safe </span>
        <span class="title-orange">Ready</span>
      </div>
      <div>
        <span class="title-black">Future </span>
        <span class="title-orange">Steady</span>
      </div>
      <p class="sub-text">
        Today’s digital world demands more than access—it requires awareness.
        <strong> DigitalShield </strong>
        equips university students with the tools to stay safe, spot misinformation, and become responsible digital citizens.
      </p>

      <div class="fake-search">
        <span class="search-label">Are You a Smart Digital Citizen?</span>
        <button class="go-button">Go test</button>
      </div>
    </div>
  </div>

  <!-- 第二屏：白色卡片区域 -->
  <div class="page-container second-section">
    <p class="quiz-title">Foster Digital Citizenship</p>
    <p class="quiz-subtitle">Work together to create a safe and better online world.</p>
    <div class="red-card-container">
      <!-- 卡片 1 -->
      <div class="red-card">
        <div class="card-content">
          <img class="quiz-img" src="@/assets/quiz1.png" alt="Quiz 1" />
          <p class="category-text">Online Safety</p>
          <p class="quiz-name">Can You Outsmart the Internet Threats?</p>
          <div class="divider"></div>
          <p class="quiz-meta">15 mins · 34 questions · 521 times</p>
          <button class="start-quiz-btn">Start Quiz</button>
        </div>
      </div>

      <!-- 卡片 2 -->
      <div class="red-card">
        <div class="card-content">
          <img class="quiz-img" src="@/assets/quiz2.png" alt="Quiz 2" />
          <p class="category-text">Digital Literacy</p>
          <p class="quiz-name">Think Before You Click</p>
          <div class="divider"></div>
          <p class="quiz-meta">12 mins · 25 questions · 780 times</p>
          <button class="start-quiz-btn">Start Quiz</button>
        </div>
      </div>

      <!-- 卡片 3 -->
      <div class="red-card">
        <div class="card-content">
          <img class="quiz-img" src="@/assets/quiz3.png" alt="Quiz 3" />
          <p class="category-text">Fact-Checking</p>
          <p class="quiz-name">Spot the Fake News</p>
          <div class="divider"></div>
          <p class="quiz-meta">10 mins · 20 questions · 601 times</p>
          <button class="start-quiz-btn">Start Quiz</button>
        </div>
      </div>
    </div>
    <router-link to="/quiz-bank">
      <button class="learn-more-btn">Learn More</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage"
};
</script>

<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
}

.first-section {
  top: 0;
  background-image: url('@/assets/background1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  box-sizing: border-box;
}

.second-section {
  top: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5vh;
}

.quiz-title {
  font-size: 48px;
  font-weight: 700;
  color: #050C26;
  margin-bottom: 10px;
}

.quiz-subtitle {
  font-size: 20px;
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 40px;
}

.red-card-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 3vw;
}

.red-card {
  width: 490px;
  height: 485px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

.quiz-img {
  width: 464px;
  height: 238px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.category-text {
  font-size: 16px;
  color: #ACACAC;
  margin-bottom: 4px;
}

.quiz-name {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 8px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
  margin: 12px 0;
}

.quiz-meta {
  font-size: 14px;
  color: #4a4a4a;
  margin-bottom: auto;
}

.start-quiz-btn {
  background-color: #FF7426;
  color: #ffffff;
  border: none;
  padding: 12px 32px;
  border-radius: 28px;
  font-size: 16px;
  font-weight: bold;
  align-self: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  margin-top: 16px;
}

.start-quiz-btn:hover {
  background-color: #e65f14;
}

.nav-bar {
  position: absolute;
  top: 5vh;
  right: 5vw;
  display: flex;
  gap: 3vw;
  font-size: 24px;
  color: #1D1D1D;
  white-space: nowrap;
}

.main-title {
  position: absolute;
  top: 30vh;
  left: 10vw;
  max-width: 600px;
}

.title-black {
  font-size: 48px;
  font-weight: 700;
  color: #050C26;
}

.title-orange {
  font-size: 48px;
  font-weight: 700;
  color: #F18829;
}

.sub-text {
  font-size: 16px;
  color: #4a4a4a;
  margin-top: 20px;
  line-height: 1.6;
}

.fake-search {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 14px 24px;
  margin-top: 30px;
  width: fit-content;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-label {
  font-size: 18px;
  font-weight: bold;
  color: #1D1D1D;
  margin-right: 24px;
  white-space: nowrap;
}

.go-button {
  background-color: #F18829;
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 28px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}

.learn-more-btn {
  background-color: #FF7426;
  color: #ffffff;
  border: none;
  padding: 14px 32px;
  border-radius: 28px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 70px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.learn-more-btn:hover {
  background-color: #e65f14;
}

.nav-link {
  font-size: 24px;
  color: #1D1D1D;
  text-decoration: none;
}
.nav-link:hover {
  text-decoration: underline;
}

</style>
