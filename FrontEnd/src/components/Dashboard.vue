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
          <!-- Full-width image below -->
          <div class="image-under-modules">
            <img src="@/assets/achieve.png" alt="Achievements" />
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
        values: [],
        showCropModal: false,
        rawAvatarUrl: '',
        cropper: null
      };
    },
    methods: {
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
  .image-under-modules {
    width: 100%;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image-under-modules img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
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
  .modal-actions {
    margin-top: 12px;
    display: flex;
    gap: 12px;
  }
  </style>
  