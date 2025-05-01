import { createRouter, createWebHistory } from 'vue-router';
import homePage from '../components/homePage.vue';
import QuizBank from '../components/QuizBank.vue';
import QuizIntroduction from '@/components/QuizIntroduction.vue';
import QuizContent from '@/components/QuizContent.vue';
import CzQuiz from '../components/CzQuiz.vue';
import QuizFeedback from '@/components/QuizFeedback.vue';
import DigitalCitiInfo from '../components/DigitalCitiInfo.vue'
import CzFeedback from '../components/CzFeedback.vue'
import InfoHubPage from '../components/InfoHubPage.vue'
import SMP from '../components/SMP.vue'
import DI from '../components/DI.vue'    
import DA from '../components/DA.vue'   



const routes = [
  {
    path: '/',
    name: 'Home',
    component: homePage
  },
  {
    path: '/di-i2',
    name: 'DI',
    component: DI
  },
  {
    path: '/da-i2',
    name: 'DA',
    component: DA
  },
  {
    path: '/info-hub-i2',
    name: 'InfoHub',
    component: InfoHubPage
  },
  {
    path: '/smp-i2',
    name: 'SMP',
    component: SMP
  },
  {
    path: '/digital-citi-info-i2',    
    name: 'DigitalCitiInfo',
    component: DigitalCitiInfo    
  },
  {
    path: '/quiz-bank-i1&i2',
    name: 'QuizBank',
    component: QuizBank
  },
  {
    path: '/Quiz-Introduction-i1',
    name: 'QuizIntroduction',
    component: QuizIntroduction
  },
  {
    path: '/cz-quiz-i1&i2',
    name: 'CzQuiz',
    component: CzQuiz
  },
  {
    path: '/Quiz-Content-i1',
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
