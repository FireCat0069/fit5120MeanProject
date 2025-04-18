import { createRouter, createWebHistory } from 'vue-router';
import homePage from '../components/homePage.vue';
import QuizBank from '../components/QuizBank.vue';
import QuizIntroduction from '@/components/QuizIntroduction.vue';
import QuizContent from '@/components/QuizContent.vue';
import CzQuiz from '../components/CzQuiz.vue';
import QuizFeedback from '@/components/QuizFeedback.vue';
import CzFeedback from '../components/CzFeedback.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: homePage
  },
  {
    path: '/quiz-bank',
    name: 'QuizBank',
    component: QuizBank
  },
  {
    path: '/Quiz-Introduction',
    name: 'QuizIntroduction',
    component: QuizIntroduction
  },
  {
    path: '/cz-quiz',
    name: 'CzQuiz',
    component: CzQuiz
  },
  {
    path: '/Quiz-Content',
    name: 'QuizContent',
    component: QuizContent
  },
  {
    path: '/cz-feedback',
    name: 'CzFeedback',
    component: CzFeedback
  },
  {path: '/Quiz-Feedback',
    name: 'QuizFeedback',
    component: QuizFeedback
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
