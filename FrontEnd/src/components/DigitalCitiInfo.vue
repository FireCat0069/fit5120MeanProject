<template>
    <div class="page-container">
      <!-- 背景图：绝对定位贴左上，宽铺满，按 70vh 显示 -->
      <img class="bg-img" src="@/assets/DCInfo.png" alt="Background" />
  
      <!-- 导航栏 -->
      <div class="nav-bar">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/quiz-bank" class="nav-link">Quiz Bank</router-link>
        <span class="nav-link">Contact us</span>
      </div>
  
      <!-- 覆盖层内容 -->
      <div class="overlay-content">
        <h1 class="info-title">Your InfoHub Title</h1>
        <p class="info-text">
          这里写一些简介文字，颜色为纯白，让它在背景图上清晰可见。
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DigitalCitiInfo'
  };
  </script>
  
  <style scoped>
  /* 页面进入动画 */
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  /* 容器：三屏高度，允许垂直滚动 */
  .page-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 300vh;        /* 三屏高度 */
    overflow-y: auto;     /* 可以滚动查看下面的空白 */
    overflow-x: hidden;
    box-sizing: border-box;
  }
  
  /* 背景图：70vh 高，宽度撑满，保持裁剪 */
  .bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 70vh;         /* 占据 70% 屏高 */
    object-fit: cover;
    pointer-events: none;
  }
  
  /* 导航栏 */
  .nav-bar {
    position: absolute;
    top: 5vh;
    right: 5vw;
    display: flex;
    gap: 3vw;
    font-size: 24px;
    white-space: nowrap;
  }
  .nav-link {
    color: #ffffff;
    text-decoration: none;
  }
  .nav-link:hover {
    text-decoration: underline;
  }
  
  /* 覆盖层内容 & 动画 */
  .overlay-content {
    position: absolute;
    top: 35vh;            /* 水平居中在图片里，可按需微调 */
    left: 10%;
    transform: translateY(-50%);
    max-width: 600px;
    animation: fadeInUp 1s ease-out both;
    animation-delay: 0.3s;
  }
  
  /* 文本样式 */
  .info-title {
    font-size: 48px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 16px;
  }
  .info-text {
    font-size: 20px;
    color: #ffffff;
    line-height: 1.6;
  }
  </style>
  