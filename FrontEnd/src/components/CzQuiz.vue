<template>
  <div class="container">
    <div class="nav-bar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/quiz-bank-i1&i2" class="nav-link">Quiz Bank</router-link>
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
      <!-- 统计柱状图：显示图表切换标签和图表 -->
      <div v-if="statsLoaded" class="stats-charts-carousel">
        <!-- 切换模块 -->
        <div class="chart-tabs">
          <div
            v-for="(title, i) in chartTitles"
            :key="i"
            class="chart-tab"
            :class="{ active: currentChartIndex === i }"
            @click="currentChartIndex = i"
          >
            {{ title }}
          </div>
        </div>
        <!-- 图表内容 -->
        <div class="chart-content">
          <h3>{{ chartTitles[currentChartIndex] }}</h3>
          <div class="chart-frame">
            <v-chart
              :option="chartOptionsList[currentChartIndex]"
              class="chart"
            />
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
          <!-- 如果答错，推荐对应类别的测验 -->
          <div v-if="feedback.isCorrect === false" class="recommendation">
            <p>
              We recommend you review the
              <router-link :to="categoryRoutes[feedback.question_order]">
                {{ categoryNames[feedback.question_order] }} Quiz
              </router-link>
              to improve your understanding.
            </p>
          </div>
        </div>
      </div>

      <!-- 新增：翻页卡片，第一页汇总所有推荐 Quiz -->
      <div v-if="feedbackList.length" class="explanation-pagination">
        <!-- Summary Page -->
        <div v-if="explanationPageIndex === 0" class="feedback-item">
          <h3>Recommended Quizzes</h3>
          <div v-if="recommendedQuizzes.length">
            <div
              v-for="(item, idx) in recommendedQuizzes"
              :key="idx"
              class="recommendation"
            >
              <router-link
                :to="categoryRoutes[item.question_order]"
                class="quiz-btn"
              >
                Review {{ categoryNames[item.question_order] }} Quiz
              </router-link>
            </div>
          </div>
          <div v-else>
            <p>All answers are correct! No quizzes recommended.</p>
          </div>
        </div>
        <!-- Individual Explanation Pages -->
        <div v-else class="feedback-item">
          <h3>Question {{ currentExplanation.question_order }}</h3>
          <p>
            <strong>Explanation:</strong>
            {{ currentExplanation.explanation }}
          </p>
        </div>
        <!-- 翻页控制 -->
        <div class="pagination-controls">
          <button
            class="pagination-btn"
            @click="prevPage"
            :disabled="explanationPageIndex === 0"
          >
            Previous
          </button>
          <span>
            {{ explanationPageIndex + 1 }}/{{ totalPages }}
          </span>
          <button
            class="pagination-btn"
            @click="nextPage"
            :disabled="explanationPageIndex === totalPages - 1"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer
]);

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
      currentChartIndex: 0,
      explanationPageIndex: 0,
      categoryRoutes: {
        6: '/Quiz-IntroductionDFP',
        7: '/Quiz-IntroductionDFP',
        8: '/Quiz-IntroductionCTO',
        9: '/Quiz-IntroductionDL',
        10: '/Quiz-IntroductionOEN',
        11: '/Quiz-IntroductionOEN',
        12: '/Quiz-IntroductionCA',
        13: '/Quiz-IntroductionCA',
        14: '/Quiz-IntroductionDW',
        15: '/Quiz-IntroductionDW',
        16: '/Quiz-IntroductionDRR',
        17: '/Quiz-IntroductionDRR',
        18: '/Quiz-IntroductionCTO',
        19: '/Quiz-IntroductionCTO'
      },
      categoryNames: {
        6: 'Digital Footprint & Privacy',
        7: 'Digital Footprint & Privacy',
        8: 'Critical Thinking Online',
        9: 'Digital Literacy',
        10: 'Online Etiquette / Netiquette',
        11: 'Online Etiquette / Netiquette',
        12: 'Cybersecurity Awareness',
        13: 'Cybersecurity Awareness',
        14: 'Digital Wellbeing',
        15: 'Digital Wellbeing',
        16: 'Digital Rights & Responsibilities',
        17: 'Digital Rights & Responsibilities',
        18: 'Critical Thinking Online',
        19: 'Critical Thinking Online'
      }
    };
  },
  computed: {
    // 总页数 = 1 (summary) + 每题一页
    totalPages() {
      return this.feedbackList.length + 1;
    },
    // 在非第一页时，取对应的解释
    currentExplanation() {
      return this.feedbackList[this.explanationPageIndex - 1] || {};
    },
    // 所有答错题目的推荐列表
    recommendedQuizzes() {
      return this.feedbackList.filter(f => f.isCorrect === false);
    }
  },
  methods: {
    fetchQuestions() {
      fetch('https://fit5120mainprojecttp20backend.onrender.com/api/mbtiquiz/questions')
        .then(res => res.json())
        .then(data => { this.questions = data; })
        .catch(err => console.error(err));
    },
    selectAnswer(qo, opt, type, event) {
      const buttons = event.currentTarget
        .closest('.options')
        .querySelectorAll('.option-btn');
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
      this.questions.forEach(q => {
        const type = q.type;
        let ans = this.answers[q.question_order];
        if (ans == null) {
          payload.push({ question_order: q.question_order, option: null });
          return;
        }
        if (typeof ans === 'string') {
          ans = ans.trim();
          const sendOpt = type !== 'fill-in-the-blank' ? ans.charAt(0) : ans;
          payload.push({ question_order: q.question_order, option: sendOpt });
        }
        if (Array.isArray(ans)) {
          ans.forEach(o => {
            const trimmed = o.trim();
            payload.push({ question_order: q.question_order, option: trimmed.charAt(0) });
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
          alert('Submission failed');
        });
    },
    fetchStats() {
      fetch('https://fit5120mainprojecttp20backend.onrender.com/api/usage/stats')
        .then(res => res.json())
        .then(data => {
          const rawGroups = [
            { title: 'Device Type', data: data.device_type },
            { title: 'Screen Time Period', data: data.screen_time_period },
            { title: 'Screen Activity', data: data.screen_activity },
            { title: 'App Category', data: data.app_category },
            { title: 'Avg Screen Time Range', data: data.average_screen_time_range }
          ];
          rawGroups.forEach(g => {
            const filtered = { ...g.data };
            if (g.title === 'Device Type') {
              ['A. Mobile Phone', 'B. Laptop', 'A', 'C. Other'].forEach(k => delete filtered[k]);
            } else if (g.title === 'Screen Time Period') {
              ['B. Afternoon (12 PM – 6 PM)', 'C. Late Night (10 PM – 6 AM)', 'A. Evening (6 PM – 10 PM)', 'B'].forEach(k => delete filtered[k]);
            } else if (g.title === 'Screen Activity') {
              ['A. Work and Study (e.g., working, studying, content creation)', 'B. Entertainment (e.g., gaming, social media)', 'A'].forEach(k => delete filtered[k]);
            } else if (g.title === 'App Category') {
              ['P'].forEach(k => delete filtered[k]);
            }
            this.chartTitles.push(g.title);
            this.chartOptionsList.push(this.createBarOption(g.title, filtered));
          });
          this.statsLoaded = true;
        })
        .catch(err => console.error(err));
    },
    createBarOption(title, dataObj) {
      const names = Object.keys(dataObj);
      const values = Object.values(dataObj).map(v => parseFloat(v));
      return {
        tooltip: { trigger: 'axis' },
        legend: { show: false },
        xAxis: { type: 'category', data: names, axisLabel: { rotate: 45, interval: 0 } },
        yAxis: { type: 'value' },
        grid: { left: '10%', right: '5%', bottom: '15%', containLabel: true },
        series: [{
          name: title,
          type: 'bar',
          data: values,
          itemStyle: { barBorderRadius: [4, 4, 0, 0] },
          emphasis: { itemStyle: { color: '#f18829' } }
        }]
      };
    },
    prevPage() {
      if (this.explanationPageIndex > 0) this.explanationPageIndex--;
    },
    nextPage() {
      if (this.explanationPageIndex < this.totalPages - 1) this.explanationPageIndex++;
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
.container {
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  padding: 40px 60px;
  font-family: Arial;
  overflow-y: auto;
  max-height: 100vh;
  background: #fff;
}
.nav-bar {
  position: absolute;
  top: 2vh;
  right: 5vw;
  display: flex;
  gap: 3vw;
  font-size: 24px;
  color: #1d1d1d;
  white-space: nowrap;
}
.nav-link, .nav-link:hover {
  color: #1d1d1d;
  text-decoration: none;
}
h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #050c26;
}
.highlight {
  color: #f18829;
}
.question-block {
  margin-bottom: 40px;
}
.question-text {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1d1d1d;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.option-btn {
  padding: 14px 20px;
  max-width: 600px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: .2s;
  font-size: 16px;
  color: #333;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  text-align: left;
}
.option-btn:hover {
  background: #fff8f5;
  border-color: #ff7426;
}
.option-btn.selected {
  background: #ff7426;
  color: #fff;
  border-color: #ff7426;
}
hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 30px 0;
}
.submit-section {
  text-align: center;
  margin-top: 50px;
}
.submit-btn {
  padding: 14px 32px;
  font-size: 18px;
  background: #f18829;
  color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.submit-btn:hover {
  background: #e65f14;
}
.feedback-section {
  margin-top: 50px;
}
.chart-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.chart-tab {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background: #fafafa;
}
.chart-tab.active {
  background: #f18829;
  color: #fff;
  border-color: #f18829;
}
.stats-charts-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
.chart-content {
  text-align: center;
}
.chart-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1200px;
  margin: 0 auto;
  transform: translateY(-60px);
}
.chart {
  width: 600px;
  height: 600px;
}
.general-feedback {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}
.feedback-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background: #f9f9f9;
}
.feedback-item h3 {
  margin-top: 0;
  color: #000;
}
.recommendation {
  margin-top: 12px;
  font-size: 16px;
}
.feedback-section * {
  color: #000 !important;
}

/* 分页卡片样式 */
.explanation-pagination {
  margin-top: 40px;
}
.quiz-btn {
  display: inline-block;
  padding: 10px 20px;
  background: #f18829;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 8px;
}
.quiz-btn:hover {
  background: #e65f14;
}
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 20px 0;
}
.pagination-btn {
  padding: 8px 16px;
  font-size: 16px;
  background: #f18829;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
