import { createRouter, createWebHistory } from 'vue-router';
import homePage from '../components/homePage.vue';
import QuizBank from '../components/QuizBank.vue';
import QuizContent from '@/components/QuizContent.vue';
import CzQuiz from '../components/CzQuiz.vue';
import QuizFeedback from '@/components/QuizFeedback.vue';
import DigitalCitiInfo from '../components/DigitalCitiInfo.vue'
import CzFeedback from '../components/CzFeedback.vue'
import InfoHubPage from '../components/InfoHubPage.vue'
import MediaPrivacyInfo from '../components/MediaPrivacyInfo.vue'
import DigitalliteracyInfo from '../components/DigitalliteracyInfo.vue'    
import DigitalAggressionInfo from '../components/DigitalAggressionInfo.vue'   
import QuizIntroductionDL from '@/components/QuizIntroductionDL.vue';
import QuizIntroductionDFP from '@/components/QuizIntroductionDFP.vue';
import QuizIntroductionOEN from '@/components/QuizIntroductionOEN.vue';
import QuizIntroductionCA from '@/components/QuizIntroductionCA.vue';
import QuizIntroductionDW from '@/components/QuizIntroductionDW.vue';
import QuizIntroductionDRR from '@/components/QuizIntroductionDRR.vue';
import QuizIntroductionCTO from '@/components/QuizIntroductionCTO.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: homePage
  },
  {
    path: '/di-i2',
    name: 'DigitalliteracyInfo',
    component: DigitalliteracyInfo
  },
  {
    path: '/da-i2',
    name: 'DigitalAggressionInfo',
    component: DigitalAggressionInfo
  },
  {
    path: '/info-hub-i2',
    name: 'InfoHub',
    component: InfoHubPage
  },
  {
    path: '/smp-i2',
    name: 'MediaPrivacyInfo',
    component: MediaPrivacyInfo
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
    path: '/Quiz-IntroductionDL',
    name: 'QuizIntroductionDL',
    component: QuizIntroductionDL
  },
  {
    path: '/Quiz-IntroductionDFP',
    name: 'QuizIntroductionDFP',
    component: QuizIntroductionDFP
  },
  {
    path: '/Quiz-IntroductionOEN',
    name: 'QuizIntroductionOEN',
    component: QuizIntroductionOEN
  },
  {
    path: '/Quiz-IntroductionCA',
    name: 'QuizIntroductionCA',
    component: QuizIntroductionCA
  },
  {
    path: '/Quiz-IntroductionDW',
    name: 'QuizIntroductionDW',
    component: QuizIntroductionDW
  },
  {
    path: '/Quiz-IntroductionDRR',
    name: 'QuizIntroductionDRR',
    component: QuizIntroductionDRR
  },
  {
    path: '/Quiz-IntroductionCTO',
    name: 'QuizIntroductionCTO',
    component: QuizIntroductionCTO
  },
  {
    path: '/cz-quiz-i1&i2',
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
