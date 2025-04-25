<template>
  <div class="container">
    <div class="nav-bar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/quiz-bank" class="nav-link">Quiz Bank</router-link>
      <span>Contact us</span>
    </div>

    <h1>
      Digital <span class="highlight">Citizenship</span> Survey
    </h1>

    <!-- 如果未提交反馈，则显示答题内容 -->
    <div v-if="!feedbackDisplayed">
      <div
        v-for="(question, index) in questions"
        :key="question.question_order"
        class="question-block"
      >
        <p class="question-text">
          {{ index + 1 }}. {{ question.question }}
        </p>

        <!-- 单选 & 多选题 -->
        <div class="options" v-if="question.type !== 'fill-in-the-blank'">
          <button
            v-for="(option, i) in question.options"
            :key="i"
            class="option-btn"
            @click="selectAnswer(question.question_order, option, question.type, $event)"
          >
            {{ option }}
          </button>
        </div>

        <!-- 填空题 -->
        <div v-else>
          <input
            type="text"
            class="option-btn"
            style="max-width: 600px;"
            v-model="answers[question.question_order]"
            placeholder="Please type your answer here"
          />
        </div>

        <hr />
      </div>

      <div class="submit-section">
        <button class="submit-btn" @click="handleSubmit">Submit</button>
      </div>
    </div>

    <!-- 提交后显示反馈 -->
    <div v-else class="feedback-section">
      <!-- 统计饼图 轮播 with left-side selector -->
      <div v-if="statsLoaded" class="stats-charts-carousel">
        <!-- Left-side chart titles as clickable rectangles -->
        <div class="chart-selector">
          <div
            v-for="(title, index) in chartTitles"
            :key="index"
            :class="['selector-item', { active: currentChartIndex === index }]"
            @click="currentChartIndex = index"
          >
            {{ title }}
          </div>
        </div>

        <!-- Chart content area -->
        <div class="chart-content">
          <h3>Usage Statistics – {{ chartTitles[currentChartIndex] }}</h3>
          <div class="chart-frame">
            <button class="nav-btn left" @click="prevChart">‹</button>
            <v-chart :option="chartOptionsList[currentChartIndex]" class="chart" />
            <button class="nav-btn right" @click="nextChart">›</button>
          </div>
        </div>
      </div>

      <!-- 通用反馈 -->
      <div v-if="generalFeedback" class="general-feedback">
        <p>{{ generalFeedback }}</p>
      </div>

      <div v-if="feedbackList.length === 0">
        <p>No feedback available.</p>
      </div>
      <div v-else>
        <div
          v-for="(feedback, index) in feedbackList"
          :key="feedback.question_order"
          class="feedback-item"
        >
          <h3>Question {{ feedback.question_order }}</h3>
          <p>
            <strong>Correct Answer:</strong>
            {{ feedback.correctAnswer }}
          </p>
          <p>
            <strong>Your Answer:</strong>
            <span v-if="feedback.isCorrect === null">Not answered</span>
            <span v-else-if="feedback.isCorrect">Correct</span>
            <span v-else>Incorrect</span>
          </p>
          <p>
            <strong>Explanation:</strong>
            {{ feedback.explanation }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export default {
  name: 'CzQuiz',
  components: { VChart },
  data() {
    return {
      questions: [],
      answers: {},
      feedbackList: [],
      generalFeedback: '',
      feedbackDisplayed: false,
      statsLoaded: false,
      chartOptionsList: [],
      chartTitles: [],
      currentChartIndex: 0
    };
  },
  methods: {
    fetchQuestions() {
      fetch('https://fit5120mainprojecttp20backend.onrender.com/api/mbtiquiz/questions')
        .then(res => res.json())
        .then(data => { this.questions = data; })
        .catch(err => console.error(err));
    },
    selectAnswer(qo, opt, type, event) {
      const buttons = event.currentTarget.closest('.options').querySelectorAll('.option-btn');
      if (type === 'single-choice') {
        buttons.forEach(btn => btn.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
        this.answers[qo] = opt;
      } else {
        const arr = this.answers[qo] || [];
        const idx = arr.indexOf(opt);
        if (idx === -1) {
          arr.push(opt);
          event.currentTarget.classList.add('selected');
        } else {
          arr.splice(idx, 1);
          event.currentTarget.classList.remove('selected');
        }
        this.answers[qo] = arr;
      }
    },
    handleSubmit() {
      const payload = [];
      this.questions.forEach((q, idx) => {
        const type = q.type;
        let ans = this.answers[q.question_order];
        if (ans == null) {
          payload.push({ question_order: q.question_order, option: null });
          return;
        }
        if (typeof ans === 'string') {
          ans = ans.trim();
          const sendOpt = type !== 'fill-in-the-blank'
            ? (idx < 5 ? ans : ans.charAt(0))
            : ans;
          payload.push({ question_order: q.question_order, option: sendOpt });
        }
        if (Array.isArray(ans)) {
          ans.forEach(o => {
            const trimmed = o.trim();
            const sendOpt = type !== 'fill-in-the-blank'
              ? (idx < 5 ? trimmed : trimmed.charAt(0))
              : trimmed;
            payload.push({ question_order: q.question_order, option: sendOpt });
          });
        }
      });
      fetch('https://fit5120mainprojecttp20backend.onrender.com/api/mbtiquiz/validate-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(res => {
          this.feedbackList = res.results || [];
          this.generalFeedback = res.feedback || '';
          this.feedbackDisplayed = true;
        })
        .catch(err => {
          console.error(err);
          alert('提交失败');
        });
    },
    fetchStats() {
      fetch('https://fit5120mainprojecttp20backend.onrender.com/api/usage/stats')
        .then(res => res.json())
        .then(data => {
          const groups = [
            { title: 'Device Type', data: data.device_type },
            { title: 'Screen Time Period', data: data.screen_time_period },
            { title: 'Screen Activity', data: data.screen_activity },
            { title: 'App Category', data: data.app_category },
            { title: 'Avg Screen Time Range', data: data.average_screen_time_range }
          ];
          groups.forEach(g => {
            this.chartTitles.push(g.title);
            this.chartOptionsList.push(this.createPieOption(g.title, g.data));
          });
          this.statsLoaded = true;
        })
        .catch(err => console.error(err));
    },
    createPieOption(title, dataObj) {
      return {
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: '75%', top: 'center', itemGap: 12 },
        series: [{
          name: title,
          type: 'pie',
          center: ['30%', '50%'],
          radius: '40%',
          data: Object.entries(dataObj).map(([name, pct]) => ({ name, value: parseFloat(pct) })),
          emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } }
        }]
      };
    },
    prevChart() {
      this.currentChartIndex =
        (this.currentChartIndex + this.chartOptionsList.length - 1) % this.chartOptionsList.length;
    },
    nextChart() {
      this.currentChartIndex = (this.currentChartIndex + 1) % this.chartOptionsList.length;
    }
  },
  mounted() {
    document.title = 'Digital Citizenship Survey';
    this.fetchQuestions();
    this.fetchStats();
  }
};
</script>

<style>
.container { width:100vw; position:absolute; left:0; top:0; padding:40px 60px; font-family:Arial; overflow-y:auto; max-height:100vh; background:#fff; }
.nav-bar { position:absolute; top:2vh; right:5vw; display:flex; gap:3vw; font-size:24px; color:#1d1d1d; white-space:nowrap; }
.nav-link, .nav-link:hover { color:#1d1d1d; text-decoration:none; }
h1 { font-size:36px; font-weight:700; margin-bottom:30px; color:#050c26; }
.highlight { color:#f18829; }
.question-block { margin-bottom:40px; }
.question-text { font-size:20px; font-weight:600; margin-bottom:16px; color:#1d1d1d; }
.options { display:flex; flex-direction:column; gap:12px; }
.option-btn { padding:14px 20px; max-width:600px; border:2px solid #e0e0e0; border-radius:12px; background:#fff; cursor:pointer; transition:.2s; font-size:16px; color:#333; box-shadow:0 1px 4px rgba(0,0,0,0.03); text-align:left; }
.option-btn:hover { background:#fff8f5; border-color:#ff7426; }
.option-btn.selected { background:#ff7426; color:#fff; border-color:#ff7426; }
hr { border:none; border-top:1px solid #ddd; margin:30px 0; }
.submit-section { text-align:center; margin-top:50px; }
.submit-btn { padding:14px 32px; font-size:18px; background:#f18829; color:#fff; border:none; border-radius:30px; cursor:pointer; font-weight:bold; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
.submit-btn:hover { background:#e65f14; }
.feedback-section { margin-top:50px; }

/* ===== new flex wrapper and selector ===== */
.stats-charts-carousel {
  display: flex;
  align-items: flex-start;
  margin-bottom:30px;
}
.chart-selector {
  display: flex;
  flex-direction: column;
  gap:12px;
  margin-right:40px;
}
.selector-item {
  width:160px;
  padding:10px;
  border-radius:6px;
  background:#f0f0f0;
  text-align:center;
  font-size:16px;
  color:#333;
  cursor:pointer;
  transition: background .2s, color .2s;
}
.selector-item.active {
  background:#ff7426;
  color:#fff;
}
.chart-content {
  flex:1;
}

/* existing carousel styles */
.stats-charts-carousel h3 { font-size:24px; margin-bottom:20px; }
.chart-frame { display:flex; align-items:center; justify-content:center; width:1200px; margin:0 auto; }
.nav-btn { background:transparent; border:none; font-size:40px; cursor:pointer; padding:0 30px; color:#333; }
.chart { width:600px; height:600px; }

.general-feedback { margin-bottom:20px; font-size:16px; color:#333; }
.feedback-item { border:1px solid #ddd; border-radius:8px; padding:15px; margin-bottom:20px; background:#f9f9f9; }
.feedback-item h3 { margin-top:0; color:#000; }
.feedback-section * { color:#000!important; }
</style>
