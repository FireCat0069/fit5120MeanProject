import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 引入 AOS 库及样式
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);

app.use(router);

// 在应用挂载前初始化 AOS
AOS.init({
  // 元素与触发点的偏移量
  offset: 200,
  // 动画持续时长（ms）
  duration: 800,
  // 缓动函数
  easing: 'ease-out-back',
  // 只在第一次滚动时执行动画
  once: true,
});

app.mount('#app');
