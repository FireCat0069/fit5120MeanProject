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
      <!-- 统计柱状图（保持不动） -->
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
            <v-chart
              :option="chartOptionsList[currentChartIndex]"
              class="chart"
            />
          </div>
        </div>
      </div>

      <div v-if="generalFeedback" class="general-feedback">
        <p>{{ generalFeedback }}</p>
      </div>

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
            v-for="rec in recommendations"
            :key="rec.question_order"
          >
            <router-link :to="categoryRoutes[rec.question_order]">
              {{ categoryNames[rec.question_order] }} Quiz (Question {{ rec.question_order }})
            </router-link>
          </li>
        </ul>
        <div v-if="!recommendations.length">
          <p>No quiz recommendations at this time.</p>
        </div>
      </div>

      <!-- 后续页：按顺序显示问题 6–19 的解析 -->
      <div v-else class="explanation-page">
        <div class="feedback-card">
          <div class="card-header">
            <h3>Question {{ detail.question_order }}</h3>
            <span
              class="badge"
              :class="detail.isCorrect ? 'correct' : 'incorrect'"
            >
              <template v-if="detail.isCorrect">✔ Correct</template>
              <template v-else>✖ Incorrect</template>
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

      // 新增分页控制
      currentPage: 0,

      // 各题号对应的测验路由
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
      // 各题号对应的类别名称
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
    // 只取题号 6–19 的反馈
    detailList() {
      return this.feedbackList.filter(
        f => f.question_order >= 6 && f.question_order <= 19
      );
    },
    // 答错题目的推荐列表
    recommendations() {
      return this.detailList.filter(f => f.isCorrect === false);
    },
    // 总页数 = 推荐页 + 每题一页
    pagesCount() {
      return 1 + this.detailList.length;
    },
    // 当前页对应的反馈详情（page 0 无此项）
    detail() {
      return this.detailList[this.currentPage - 1] || {};
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pagesCount - 1) {
        this.currentPage++;
      }
    },
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
          const sendOpt = type !== 'fill-in-the-blank' ? ans.charAt(0) : ans;
          payload.push({ question_order: q.question_order, option: sendOpt });
        }
        if (Array.isArray(ans)) {
          ans.forEach(o => {
            const trimmed = o.trim();
            const sendOpt = trimmed.charAt(0);
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
              ['A. Mobile Phone','B. Laptop','A','C. Other'].forEach(k=>delete filtered[k]);
            } else if (g.title === 'Screen Time Period') {
              ['B. Afternoon (12 PM – 6 PM)','C. Late Night (10 PM – 6 AM)','A. Evening (6 PM – 10 PM)','B'].forEach(k=>delete filtered[k]);
            } else if (g.title === 'Screen Activity') {
              ['A. Work and Study (e.g., working, studying, content creation)','B. Entertainment (e.g., gaming, social media)','A'].forEach(k=>delete filtered[k]);
            } else if (g.title === 'App Category') {
              ['P'].forEach(k=>delete filtered[k]);
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
/* 整体布局保持不变… */
/* …（省略其他现有样式）… */

/* 分页按钮 */
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

/* 反馈卡片 */
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
