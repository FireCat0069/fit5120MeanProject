<template>
    <div class="quizbank-container" @touchmove.prevent>
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo">DigiWise</div>
        <nav class="nav">
          <router-link
            to="/dashboard-i3"
            class="nav-item"
            :class="{ active: $route.path === '/dashboard-i3' }"
          >Dashboard</router-link>
          <router-link
            to="/info-hub-i2"
            class="nav-item"
            :class="{ active: $route.path === '/info-hub-i2' }"
          >Info Hub</router-link>
          <router-link
            to="/quiz-bank-i1&i2"
            class="nav-item"
            :class="{ active: $route.path === '/quiz-bank-i1&i2' }"
          >Quiz Bank</router-link>
        </nav>
      </aside>
  
      <!-- Main Area -->
      <main class="main-area">
        <!-- Search Bar -->
        <div class="search-bar">
          <input type="text" placeholder="Search news" class="search-input" />
          <button class="search-button">Search</button>
        </div>
  
        <!-- Profile Section -->
        <div class="profile-section">
          <div class="avatar-wrapper">
            <img :src="userAvatar" alt="User Avatar" class="avatar-img" />
            <button class="change-btn" @click="triggerAvatarSelect">Change Avatar</button>
            <input
              type="file"
              accept="image/*"
              ref="fileInput"
              @change="onFileChange"
              style="display: none;"
            />
          </div>
  
          <!-- Name and Stats -->
          <div class="user-info">
            <div class="name-level">
              <template v-if="!editingName">
                <h2 class="user-name" @click="enableEdit">{{ userName }}</h2>
                <small class="user-level">{{ userLevel }}</small>
              </template>
              <template v-else>
                <input
                  class="name-input"
                  v-model="userName"
                  @blur="disableEdit"
                  placeholder="Enter name"
                />
              </template>
            </div>
            <div class="progress-bar">
              <div class="progress" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="stats">
              <div class="stat-card">
                <div class="icon">1</div>
                <div class="stat-text">{{ quizzesPassed }} quizzes passed</div>
              </div>
              <div class="stat-card">
                <div class="icon">2</div>
                <div class="stat-text">{{ fastestTime }} fastest time</div>
              </div>
              <div class="stat-card">
                <div class="icon">3</div>
                <div class="stat-text">{{ correctAnswers }} correct answers</div>
              </div>
              <button class="clear-storage-btn" @click="clearStorage">
    Clear Storage
  </button>
            </div>
          </div>
        </div>
  
        <!-- Charts Section: radar chart and scores, then image -->
        <div class="chart-area">
          <!-- Modules row -->
          <div class="modules-row">
            <div class="radar-chart-container">
              <div ref="scoreChart" class="chart"></div>
            </div>
            <div class="score-list-container">
              <ul class="score-list">
                <li v-for="(name, idx) in indicators" :key="name">
                  <span class="score-name">{{ name }}</span>
                  <span class="score-value">{{ values[idx] }}</span>
                </li>
              </ul>
            </div>
          </div>
<!-- 修改后的 HTML 结构（保持不变） -->
<div class="image-under-modules">
  <!-- 左侧：6 个图片模块 -->
  <div class="modules-grid">
    <div
      :class="[
        'module-item',
        'item-1',
        { greyed: !hasCompletedAny }
      ]"
    >
      <button class="view-btn">View</button>
    </div>
    <div
    :class="[
      'module-item',
      'item-2',
      { greyed: !hasCompletedAll }
    ]"
  >
    <button class="view-btn">View</button>
  </div>
  <div
   :class="[
     'module-item','item-3',
     { greyed: !hasAllAboveFive }
   ]"
 >
    <button class="view-btn">View</button>
  </div>
  <div
   :class="[
    'module-item','item-4',
    { greyed: !hasAllPerfect }
  ]"
 >
    <button class="view-btn">View</button>
  </div>
  <div
   :class="[
     'module-item','item-5',
     { greyed: !hasNameChanged }
   ]"
 >
    <button class="view-btn">View</button>
  </div>
  <div
   :class="[
     'module-item','item-6',
     { greyed: !hasUnlockedSixth }
   ]"
 >
    <button class="view-btn">View</button>
  </div>
  </div>

  <!-- 右侧：文字容器 -->
  <div class="text-container">
    <h2>Earn Your Digital Badges</h2>
    <p>
      Unlock achievements by completing digital citizenship quizzes and related
      tasks. Each badge represents a milestone in your journey toward becoming
      a responsible and empowered digital citizen.
    </p>
    <button class="learn-more-btn" @click="showLearnMore">Learn More</button>

<!-- right below your existing Crop Modal, add: -->
<div v-if="showLearnMoreModal" class="modal-overlay">
  <div class="modal-content unlock-guide">
    <h2>How to Unlock Your Badges</h2>
    <ul>
      <li><strong>Trailblazer</strong>: Complete any quiz.</li>
      <li><strong>Pathfinder</strong>: Complete all quizzes at least once.</li>
      <li><strong>High Achiever</strong>: Score 5 or more on every quiz.</li>
      <li><strong>Perfectionist</strong>: Get a full 10 on every quiz.</li>
      <li><strong>Identity Forge</strong>: Change your display name from “Input name.”</li>
      <li><strong>Legendary Champion</strong>: Achieve all of the above!</li>
    </ul>
    <button class="close-btn" @click="closeLearnMore">Got it!</button>
  </div>
</div>
  </div>
</div>
        </div>
  
        <!-- Quiz Cards (empty) -->
        <transition-group name="fade" tag="div" class="card-wrapper" appear>
          <div class="quiz-card" v-for="(quiz, index) in quizzes" :key="index">
            <div class="card-content"></div>
          </div>
        </transition-group>
  
        <!-- Crop Modal -->
        <div v-if="showCropModal" class="modal-overlay">
          <div class="modal-content">
            <div class="crop-container">
              <img :src="rawAvatarUrl" ref="cropImage" />
            </div>
            <div class="modal-actions">
              <button @click="confirmCrop">Confirm</button>
              <button @click="cancelCrop">Cancel</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts/core';
  import { RadarChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import Cropper from 'cropperjs';
  import 'cropperjs/dist/cropper.css';
  import {
    getScoresForChart,
    getUserName,
    setUserName,
    getUserAvatar,
    setUserAvatar
  } from '../../localS/storage.js';
  import defaultAvatar from '@/assets/user.png';
  
  echarts.use([
    RadarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    CanvasRenderer
  ]);
  
  export default {
    computed: {
    /**
     * 用户是否至少完成过一次 quiz
     */
    hasCompletedAny() {
      const records = getScoresForChart();
      return records.some(r => r.score !== null);
    },
    hasCompletedAll() {
    const rec = getScoresForChart()
    return rec.length > 0 && rec.every(r => r.score !== null)
  },
  hasAllAboveFive() {
     // 确保已经对 7 个 quiz 都有评分，并且每个分数都 ≥ 5
     return this.values.length === this.indicators.length
         && this.values.every(v => v !== null && v >= 5)
   },
   hasAllPerfect() {
     return (
       this.values.length === this.indicators.length &&
       this.values.every(v => v === 10)
     );
   },
  hasNameChanged() {
    return this.userName && this.userName !== 'Input name';
  },
  hasUnlockedSixth() {
     return this.hasCompletedAny
         && this.hasCompletedAll
         && this.hasAllAboveFive
         && this.hasAllPerfect
         && this.hasNameChanged;
  }
  },
    name: 'QuizBank',
    data() {
      return {
        quizzes: [],
        userName: '',
        userAvatar: null,
        userLevel: 'Bonus booster 24lv',
        editingName: false,
        progress: 0,
        quizzesPassed: 0,
        fastestTime: '0min',
        correctAnswers: 0,
        quizData: [],
        indicators: [],
        showLearnMoreModal: false,
        values: [],
        showCropModal: false,
        rawAvatarUrl: '',
        cropper: null
      };
    },
    methods: {
      showLearnMore() {
     this.showLearnMoreModal = true;
   },
   closeLearnMore() {
     this.showLearnMoreModal = false;
   },
      clearStorage() {
      // 清空整个 localStorage
      localStorage.clear();

      // 重置组件中所有和存储相关的数据
      this.userName = '';
      this.userAvatar = defaultAvatar;
      this.progress = 0;
      this.quizzesPassed = 0;
      this.fastestTime = '0min';
      this.correctAnswers = 0;

      // 将雷达图数据清零并重绘
      this.values = this.indicators.map(() => 0);
      this.initChart();
    },
      enableEdit() {
        this.editingName = true;
        this.$nextTick(() => this.$el.querySelector('.name-input').focus());
      },
      disableEdit() {
        this.editingName = false;
        setUserName(this.userName);
      },
      initChart() {
        const records = getScoresForChart();
        const indicators = [
          'Digital Literacy',
          'Digital Footprint & Privacy',
          'Online Etiquette / Netiquette',
          'Cybersecurity Awareness',
          'Digital Wellbeing',
          'Digital Rights & Responsibilities',
          'Critical Thinking Online'
        ];
        const values = indicators.map(name => {
          const rec = records.find(r => r.quizId === name);
          return rec ? rec.score : 0;
        });
        this.indicators = indicators;
        this.values = values;
        this.quizzesPassed = values.filter(v => v === 10).length;
  
        const chart = echarts.init(this.$refs.scoreChart);
        chart.setOption({
          tooltip: {},
          radar: {
            indicator: indicators.map(name => ({ name, max: 10 })),
            radius: '70%',
            splitNumber: 5
          },
          series: [{
            name: 'Quiz Scores',
            type: 'radar',
            data: [{ value: values, name: 'Scores' }],
            areaStyle: {}
          }]
        });
        window.addEventListener('resize', () => chart.resize());
      },
      triggerAvatarSelect() {
        this.$refs.fileInput.click();
      },
      onFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 4 * 1024 * 1024) return alert('Image must be smaller than 4MB');
        const reader = new FileReader();
        reader.onload = () => {
          this.rawAvatarUrl = reader.result;
          this.showCropModal = true;
          this.$nextTick(() => {
            if (this.cropper) this.cropper.destroy();
            this.cropper = new Cropper(this.$refs.cropImage, {
              aspectRatio: 1,
              viewMode: 1,
              autoCropArea: 1
            });
          });
        };
        reader.readAsDataURL(file);
      },
      confirmCrop() {
        const canvas = this.cropper.getCroppedCanvas({ width: 200, height: 200 });
        const dataUrl = canvas.toDataURL('image/png');
        setUserAvatar(dataUrl);
        this.userAvatar = dataUrl;
        this.cropper.destroy();
        this.cropper = null;
        this.showCropModal = false;
      },
      cancelCrop() {
        if (this.cropper) {
          this.cropper.destroy();
          this.cropper = null;
        }
        this.showCropModal = false;
      }
    },
    mounted() {
      this.userName = getUserName();
      this.userAvatar = getUserAvatar() || defaultAvatar;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      this.initChart();
    },
    unmounted() {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  };
  </script>
  
  <style scoped>
  .quizbank-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #fbf9f9;
    font-family: Arial, sans-serif;
  }
  .sidebar {
    width: 16vw;
    background: #fff;
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
    padding: 30px 40px 10px;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background: #fbf9f9;
  }
  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .search-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
  }
  .search-button {
    margin-left: 16px;
    padding: 10px 24px;
    background: #ff7426;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }
  .search-button:hover {
    background: #e65f14;
  }
  .profile-section {
    display: flex;
    align-items: center;
    margin-top: 5vh;
  }
  .avatar-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    transition: opacity 0.2s;
  }
  .change-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
  }
  .avatar-wrapper:hover .avatar-img {
    opacity: 0.6;
  }
  .avatar-wrapper:hover .change-btn {
    display: block;
  }
  .user-info {
    margin-left: 20px;
    flex: 1;
  }
  .name-level {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .user-name {
    font-size: 24px;
    color: #1e3a8a;
    cursor: pointer;
    margin: 0;
  }
  .user-level {
    color: #757575;
  }
  .name-input {
    font-size: 24px;
    padding: 4px 8px;
  }
  .progress-bar {
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    margin: 10px 0;
  }
  .progress {
    height: 100%;
    background: #3b4cca;
    border-radius: 4px;
  }
  .stats {
    display: flex;
    gap: 20px;
    margin-top: 10px;
  }
  .stat-card {
    background: #fff;
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  .icon {
    font-size: 20px;
    font-weight: bold;
  }
  .stat-text {
    font-size: 14px;
    color: #333;
  }
  
  /* Charts Section */
  .chart-area {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
  }
  .modules-row {
    display: flex;
    gap: 20px;
  }
  .radar-chart-container,
  .score-list-container {
    width: 50%;
    height: 250px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 16px;
  }
  .radar-chart-container .chart {
    width: 100%;
    height: 100%;
  }
  .score-list-container .score-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .score-list-container .score-list li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
  }
  .score-name {
    font-weight: bold;
    color:#1d1d1d
  }
  .score-value {
    color: #1e3a8a;
  }
/* 原有父容器样式，保持不变并加上背景图 */
/* 父容器：指定固定高度，让子方格根据它来撑开 */
.image-under-modules {
  width: 100%;
  height: 400px;
  background: #fff url('@/assets/achieve.png') center/contain no-repeat;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 16px;

  display: flex;
  align-items: stretch;
}

.modules-grid {
  width: 50%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
}

.module-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: transparent; /* 去掉底色 */
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.item-1 { background-image: url('@/assets/a1.png'); }
.item-2 { background-image: url('@/assets/a2.png'); }
.item-3 { background-image: url('@/assets/a3.png'); }
.item-4 { background-image: url('@/assets/a4.png'); }
.item-5 { background-image: url('@/assets/a5.png'); }
.item-6 { background-image: url('@/assets/a6.png'); }

.text-container {
  width: 50%;
  height: 100%;
  padding: 16px;
  text-align: center;
  color: #000;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 4px;
  overflow-y: auto;
}

.learn-more-btn {
  background-color: #ff7426;
  color: #ffffff;
  border: none;
  padding: 14px 32px;
  border-radius: 28px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 12vh;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: background-color 0.3s ease;
}

.learn-more-btn:hover {
  background-color: #e65f14;
}

.view-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;         /* 默认隐藏 */
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.module-item:hover .view-btn {
  display: block;        /* 悬停时显示按钮 */
}
  /* Crop Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content.unlock-guide {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  text-align: left;
}

.modal-content.unlock-guide h2 {
  margin-top: 0;
  font-size: 20px;
  color: #333;
}

.modal-content.unlock-guide ul {
  list-style: none;
  padding: 0;
  margin: 16px 0;
}

.modal-content.unlock-guide li {
  margin-bottom: 12px;
  line-height: 1.4;
}

.modal-content.unlock-guide .close-btn {
  display: block;
  margin: 0 auto;
  padding: 8px 16px;
  background: #ff7426;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal-content.unlock-guide .close-btn:hover {
  background: #e65f14;
}
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
  }
  .crop-container img {
    max-width: 100%;
    max-height: 70vh;
  }
  .module-item.greyed {
  filter: grayscale(100%);
}
.clear-storage-btn {
  margin-left: 5vw;
  padding: 8px 16px;
  background: #ff7426;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clear-storage-btn:hover {
  background: #e65f14;
}
  .modal-actions {
    margin-top: 12px;
    display: flex;
    gap: 12px;
  }
  </style>
  