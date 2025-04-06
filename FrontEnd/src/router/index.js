import { createRouter, createWebHistory } from 'vue-router';
import homePage from '../components/homePage.vue';
import QuizBank from '../components/QuizBank.vue';


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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
