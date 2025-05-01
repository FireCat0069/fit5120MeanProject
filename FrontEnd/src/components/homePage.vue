<template>
  <!-- 第一屏 -->
  <div class="page-container first-section">
    <div class="nav-bar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/quiz-bank" class="nav-link">Dashboard</router-link>
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
        Being online is easy. Being smart about it? 
        That’s where DigitalShield comes in helping students stay safe, dodge misinformation, and master digital life.
      </p>

      <div class="fake-search">
        <!-- 打字机效果目标元素 -->
        <span class="search-label" ref="typed"></span>
        <router-link to="/cz-quiz">
          <button class="go-button">Go test</button>
        </router-link>
      </div>
    </div>
  </div>

  <!-- 第二屏：白色卡片区域 -->
  <div class="page-container second-section">
    <p class="quiz-title">Foster Digital Citizenship InfoHub</p>
    <p class="quiz-subtitle">Work together to create a safe and better online world.</p>
    <div class="red-card-container">
      <!-- 卡片 1 -->
      <div class="red-card" data-aos="fade-up" data-aos-delay="100">
        <div class="card-content">
          <img class="quiz-img" src="@/assets/DCInfo.png" alt="Quiz 1" />
          <p class="category-text">Online Safety</p>
          <p class="quiz-name">What's the Digital Citizenship?</p>
          <div class="divider"></div>
          <p class="quiz-meta">15 mins · 2 videos · 521 times</p>
          <router-link to="/digital-citi-info">
            <button class="start-quiz-btn">Learn More</button>
          </router-link>
        </div>
      </div>

      <!-- 卡片 2 -->
      <div class="red-card" data-aos="fade-up" data-aos-delay="200">
        <div class="card-content">
          <img class="quiz-img" src="@/assets/SMP.png" alt="Quiz 2" />
          <p class="category-text">Digital Literacy</p>
          <p class="quiz-name">Building Your Privacy Fortress Online</p>
          <div class="divider"></div>
          <p class="quiz-meta">12 mins · 25 questions · 780 times</p>
          <router-link to="/smp">
            <button class="start-quiz-btn">Learn More</button>
          </router-link>
        </div>
      </div>

      <!-- 卡片 3 -->
      <div class="red-card" data-aos="fade-up" data-aos-delay="300">
        <div class="card-content">
          <img class="quiz-img" src="@/assets/di.png" alt="Quiz 3" />
          <p class="category-text">Fact-Checking</p>
          <p class="quiz-name">Click Smart: Building Your Digital IQ</p>
          <div class="divider"></div>
          <p class="quiz-meta">10 mins · 20 questions · 601 times</p>
          <router-link to="/di-i2">
            <button class="start-quiz-btn">Learn More</button>
          </router-link>
        </div>
      </div>
    </div>
    <router-link to="/info-hub">
      <button class="learn-more-btn">Explore more</button>
    </router-link>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';

export default {
  name: 'HomePage',
  mounted() {
    AOS.init({ once: true, duration: 800 });
    // 打字机效果配置
    const options = {
      strings: ['Are You a Smart Digital Citizen?'],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: '|',
      loop: false,
      onComplete: (self) => {
        // 打字完成后 5 秒后重置并重新播放
        setTimeout(() => {
          self.reset();
          self.start();
        }, 5000);
      }
    };
    // 初始化 Typed.js
    this.typed = new Typed(this.$refs.typed, options);
  },
  beforeDestroy() {
    if (this.typed) {
      this.typed.destroy();
    }
  }
};
</script>

<style scoped>
/* 页面进入动画：淡入向上 */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.main-title,
.fake-search { animation: fadeInUp 1s ease-out both; }
.main-title { animation-delay: 0.3s; }
.fake-search { animation-delay: 0.6s; }

/* 原有样式 */
.page-container { width: 100vw; height: 100vh; position: absolute; left: 0; }
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
.quiz-title { font-size: 48px; font-weight: 700; color: #050c26; margin-bottom: 10px; }
.quiz-subtitle { font-size: 20px; font-weight: 500; color: #4a4a4a; margin-bottom: 40px; }
.red-card-container { display: flex; justify-content: center; align-items: stretch; gap: 3vw; }
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
.card-content { display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; width: 100%; height: 100%; padding: 20px; box-sizing: border-box; position: relative; }
.quiz-img { width: 464px; height: 238px; object-fit: cover; border-radius: 8px; margin-bottom: 16px; }
.category-text { font-size: 16px; color: #acacac; margin-bottom: 4px; }
.quiz-name { font-size: 20px; font-weight: bold; color: #000000; margin-bottom: 8px; }
.divider { width: 100%; height: 1px; background-color: #e0e0e0; margin: 12px 0; }
.quiz-meta { font-size: 14px; color: #4a4a4a; margin-bottom: auto; }
.start-quiz-btn {
  /* 块级元素，才能让 margin 左右 auto 生效 */
  display: block;

  /* 上间距 16px，左右自动居中，底部 0 */
  margin: 16px auto 0;

  background-color: #ff7426;
  color: #ffffff;
  border: none;
  padding: 12px 32px;
  border-radius: 28px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.start-quiz-btn:hover {
  background-color: #e65f14;
}
.nav-bar { position: absolute; top: 5vh; right: 5vw; display: flex; gap: 3vw; font-size: 24px; color: #1d1d1d; white-space: nowrap; }
.main-title { position: absolute; top: 30vh; left: 10vw; max-width: 600px; }
.title-black { font-size: 48px; font-weight: 700; color: #050c26; }
.title-orange { font-size: 48px; font-weight: 700; color: #f18829; }
.sub-text { font-size: 20px; color: #4a4a4a; margin-top: 20px; line-height: 1.6; }
.fake-search {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 14px 24px;
  width: 65ch; /* 固定为完整文本长度 */
  height: 10ch;
  margin-top: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.search-label {
  font-size: 18px;
  font-weight: bold;
  color: #1d1d1d;
  margin-right: 24px;
  white-space: nowrap;
  display: inline-block;
  width: 32ch; /* 固定为完整文本长度 */
  overflow: hidden;
}
.go-button { background-color: #f18829; color: white; border: none; padding: 14px 30px; border-radius: 28px; cursor: pointer; font-size: 20px; font-weight: bold; }
.learn-more-btn { background-color: #ff7426; color: #ffffff; border: none; padding: 14px 32px; border-radius: 28px; font-size: 18px; font-weight: bold; cursor: pointer; margin-top: 12vh; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.3s ease; }
.learn-more-btn:hover { background-color: #e65f14; }

/* ==== 新增覆盖：清除所有链接和按钮的默认高亮/背景 ==== */
a,
a:link,
a:visited,
a:hover,
a:focus,
a:active {
  background-color: transparent !important;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

button:focus,
button:active {
  background-color: transparent !important;
  outline: none;
  box-shadow: none;
}

/* 确保自定义按钮在所有状态下保持设计色 */
.go-button,
.go-button:focus,
.go-button:active {
  background-color: #f18829 !important;
}
.go-button:hover {
  background-color: #e65f14 !important;
}

.start-quiz-btn,
.start-quiz-btn:focus,
.start-quiz-btn:active {
  background-color: #ff7426 !important;
}
.start-quiz-btn:hover {
  background-color: #e65f14 !important;
}

.learn-more-btn,
.learn-more-btn:focus,
.learn-more-btn:active {
  background-color: #ff7426 !important;
}
.learn-more-btn:hover {
  background-color: #e65f14 !important;
}
</style>
