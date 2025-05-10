<template>
    <div class="quizbank-container" @touchmove.prevent>
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo">DigiWise</div>
        <nav class="nav">
          <router-link to="/dashboard-i3" class="nav-item" :class="{ active: $route.path === '/dashboard-i3' }">Dashboard</router-link>
          <router-link to="/info-hub-i2" class="nav-item" :class="{ active: $route.path === '/info-hub-i2' }">Info Hub</router-link>
          <router-link to="/quiz-bank-i1&i2" class="nav-item" :class="{ active: $route.path === '/quiz-bank-i1&i2' }">Quiz Bank</router-link>
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
            <img src="@/assets/user.png" alt="User Avatar" class="avatar-img" />
            <button class="change-btn">Change Avatar</button>
          </div>
          <div class="user-info">
            <div class="name-level">
              <template v-if="!editingName">
                <h2 class="user-name" @click="enableEdit">{{ userName }}</h2>
                <small class="user-level">{{ userLevel }}</small>
              </template>
              <template v-else>
                <input class="name-input" v-model="userName" @blur="disableEdit" placeholder="Enter name" />
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
  
        <!-- Charts Section: actual quiz scores -->
        <div class="chart-area">
          <div class="line-chart-container">
            <div ref="scoreChart" class="chart"></div>
          </div>
          <div class="achieve-image-container">
            <img src="@/assets/achieve.png" alt="Achievements" />
          </div>
        </div>
  
        <!-- Quiz Cards (empty) -->
        <transition-group name="fade" tag="div" class="card-wrapper" appear>
          <div class="quiz-card" v-for="(quiz, index) in quizzes" :key="index">
            <div class="card-content"></div>
          </div>
        </transition-group>
      </main>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts/core';
  import { LineChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import { getScoresForChart } from '../../localS/storage.js';
  
  echarts.use([LineChart, TitleComponent, TooltipComponent, GridComponent, CanvasRenderer]);
  
  export default {
    name: 'QuizBank',
    data() {
      return {
        quizzes: [],
        userName: 'Michael Clifford',
        userLevel: 'Bonus booster 24lv',
        editingName: false,
        progress: 0,
        quizzesPassed: 0,
        fastestTime: '0min',
        correctAnswers: 0,
        quizData: []
      };
    },
    methods: {
      enableEdit() {
        this.editingName = true;
        this.$nextTick(() => this.$el.querySelector('.name-input').focus());
      },
      disableEdit() {
        this.editingName = false;
      },
      initChart() {
        // 从 localStorage 获取实际分数数据
        const records = getScoresForChart();
        const labels = records.map(r => r.quizId);
        const data = records.map(r => r.score);
        this.quizData = records;
  
        // 计算 "通过" 次数（每次满分 10 分算一次）
        this.quizzesPassed = data.filter(score => score === 10).length;
  
        const chart = echarts.init(this.$refs.scoreChart);
        chart.setOption({
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: labels },
          yAxis: { type: 'value', min: 0, max: 10 },
          series: [{ data: data, type: 'line', smooth: true }],
          grid: { left: '10%', right: '10%', bottom: '15%', containLabel: true }
        });
        window.addEventListener('resize', () => chart.resize());
      }
    },
    mounted() {
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
  .quizbank-container { position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; background-color: #fbf9f9; font-family: Arial, sans-serif; }
  .sidebar { width: 16vw; background: #fff; padding: 24px; box-shadow: 2px 0 6px rgba(0,0,0,0.1); }
  .logo { font-size: 20px; font-weight: bold; color: #f97316; margin-bottom: 40px; }
  .nav { display: flex; flex-direction: column; gap: 20px; }
  .nav-item { font-size: 16px; color: #1d1d1d; text-decoration: none; cursor: pointer; }
  .nav-item.active { font-weight: bold; }
  .main-area { flex: 1; padding: 30px 40px 10px; box-sizing: border-box; overflow: auto; display: flex; flex-direction: column; background: #fbf9f9; }
  .search-bar { display: flex; align-items: center; margin-bottom: 20px; }
  .search-input { flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; }
  .search-button { margin-left:16px; padding: 10px 24px; background: #ff7426; color: #fff; border:none; border-radius:6px; font-weight:bold; cursor:pointer; }
  .search-button:hover { background: #e65f14; }
  .profile-section { display: flex; align-items: center; margin-top: 5vh; }
  .avatar-wrapper { position: relative; width:100px; height:100px; }
  .avatar-img { width:100%; height:100%; border-radius:50%; object-fit:cover; transition: opacity .2s; }
  .change-btn { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); display:none; background: rgba(0,0,0,0.6); color:#fff; padding:6px 12px; border:none; border-radius:4px; }
  .avatar-wrapper:hover .avatar-img { opacity:0.6; }
  .avatar-wrapper:hover .change-btn { display:block; }
  .user-info { margin-left:20px; flex:1; }
  .name-level { display:flex; align-items:center; gap:12px; }
  .user-name { font-size:24px; color:#1e3a8a; cursor:pointer; margin:0; }
  .user-level { color:#757575; }
  .name-input { font-size:24px; padding:4px 8px; }
  .progress-bar { width: 100%; height:8px; background:#e0e0e0; border-radius:4px; margin:10px 0; }
  .progress { height:100%; background:#3b4cca; border-radius:4px; }
  .stats { display:flex; gap:20px; margin-top:10px; }
  .stat-card { background:#fff; padding:12px 16px; border-radius:8px; display:flex; align-items:center; gap:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
  .icon { font-size:20px; font-weight:bold; }
  .stat-text { font-size:14px; color:#333; }
  .chart-area { display: flex; flex-direction: column; gap:20px; margin-top:30px; }
  .line-chart-container, .achieve-image-container { width: 100%; height: 250px; background:#fff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; }
  .line-chart-container .chart { width: 100%; height: 100%; }
  .achieve-image-container img { max-width: 100%; max-height: 100%; object-fit: contain; }
  </style>
  