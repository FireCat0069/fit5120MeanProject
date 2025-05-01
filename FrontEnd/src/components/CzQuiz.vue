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
      <!-- 原题目列表保持不变 -->
      <div
        v-for="(question, index) in questions"
        :key="question.question_order"
        class="question-block"
      >
        <p class="question-text">
          {{ index + 1 }}. {{ question.question }}
        </p>

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
      <!-- 统计柱状图保持不动 -->
      <div v-if="statsLoaded" class="stats-charts-carousel">
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
        <div class="chart-content">
          <h3>{{ chartTitles[currentChartIndex] }}</h3>
          <div class="chart-frame">
            <v-chart :option="chartOptionsList[currentChartIndex]" class="chart" />
          </div>
        </div>
      </div>

      <div v-if="generalFeedback" class="general-feedback">
        <p>{{ generalFeedback }}</p>
      </div>

      <div v-if="feedbackList.length === 0">
        <p>No feedback available.</p>
      </div>
      <div v-else>
        <!-- 分页导航 -->
        <div class="pagination-container">
          <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
          <span>Page {{ currentPage + 1 }} / {{ pagesCount }}</span>
          <button @click="nextPage" :disabled="currentPage === pagesCount - 1">Next</button>
        </div>

        <!-- 第 1 页：推荐 Quiz 链接 -->
        <div v-if="currentPage === 0" class="recommendation-page">
          <h3>Recommended Quizzes</h3>
          <ul>
            <li
              v-for="f in incorrectFeedback"
              :key="f.question_order"
            >
              <router-link :to="categoryRoutes[f.question_order]">
                {{ categoryNames[f.question_order] }} Quiz (Q{{ f.question_order }})
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 后续页：按顺序显示每道题的解析 -->
        <div v-else class="explanation-page">
          <div class="feedback-card">
            <div class="card-header">
              <h3>Question {{ detail.question_order }}</h3>
              <span class="badge" :class="detail.isCorrect ? 'correct' : 'incorrect'">
                {{ detail.isCorrect ? '✔ Correct' : '✖ Incorrect' }}
              </span>
            </div>
            <p class="card-question">{{ detail.question }}</p>
            <p>
              <strong>Your Answer:</strong>
              {{ detail.yourAnswer || 'Not answered' }}
            </p>
            <p>
              <strong>Explanation:</strong>
              {{ detail.explanation }}
            </p>
          </div>
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

use([BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer]);

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

      // 分页控制
      currentPage: 0,

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
    // 只保留 6–19 题的反馈
    detailList() {
      return this.feedbackList.filter(f => f.question_order >= 6 && f.question_order <= 19);
    },
    // 错误的反馈，用于推荐 Quiz
    incorrectFeedback() {
      return this.detailList.filter(f => f.isCorrect === false);
    },
    // 总页数 = 1（推荐页） + 每题一页
    pagesCount() {
      return 1 + this.detailList.length;
    },
    // 当前页对应的详情项
    detail() {
      return this.detailList[this.currentPage - 1] || {};
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 0) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.pagesCount - 1) this.currentPage++;
    },

    fetchQuestions() {
      fetch('https://fit5120mainprojecttp20backend.onrender.com/api/mbtiquiz/questions')
        .then(res => res.json())
        .then(data => (this.questions = data))
        .catch(console.error);
    },
    selectAnswer(qo, opt, type, event) { /* 保持不变 */ },
    handleSubmit() { /* 保持不变 */ },
    fetchStats() { /* 保持不变 */ },
    createBarOption() { /* 保持不变 */ }
  },
  mounted() {
    document.title = 'Digital Citizenship Survey';
    this.fetchQuestions();
    this.fetchStats();
  }
};
</script>

<style>
/* 原有样式保持不变 */

/* 分页导航 */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
}
.pagination-container button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
}
.pagination-container button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 推荐页 */
.recommendation-page ul {
  list-style: none;
  padding: 0;
}
.recommendation-page li {
  margin-bottom: 8px;
}

/* 反馈卡片样式 */
.feedback-card {
  background: #ecf9ec;
  border-left: 6px solid #4caf50;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.badge {
  font-size: 14px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
}
.badge.correct {
  background: #4caf50;
  color: #fff;
}
.badge.incorrect {
  background: #f44336;
  color: #fff;
}
.card-question {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0;
}
</style>
