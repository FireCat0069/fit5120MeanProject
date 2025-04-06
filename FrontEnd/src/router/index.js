import { createRouter, createWebHistory } from 'vue-router';
import homePage from '../components/homePage.vue';
import QuizBank from '../components/QuizBank.vue';
import QuizIntroduction from '@/components/QuizIntroduction.vue';
import QuizContent from '@/components/QuizContent.vue';


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
    path: '/Quiz-Content',
    name: 'QuizContent',
    component: QuizContent
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
