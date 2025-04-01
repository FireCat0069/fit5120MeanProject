<template>
    <!-- 页面根容器 -->
    <div class="homepage-container">
      <!-- 你的页面内容 -->
      <slot></slot>
    </div>
  </template>
  
  <style scoped>
  /* 处理根元素高度 */
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  .homepage-container {
    /* 基础背景设置 */
    background-image: url('@/assets/background1.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    
    /* 视口高度适配 */
    min-height: 100vh;
    
    /* 内容布局 */
    display: flex;
    flex-direction: column;
    
    /* 防止边距穿透 */
    overflow-y: auto;
    
    /* 移动端适配增强 */
    position: relative;
    
    /* 添加半透明遮罩提升文字可读性（可选） */
    box-shadow: inset 0 0 0 2000px rgba(255, 255, 255, 0.1);
  }
  
  /* 响应式适配 */
  @media (max-width: 768px) {
    .homepage-container {
      /* 移动端优化显示 */
      background-size: cover;
      background-attachment: scroll; /* 取消固定定位提升移动端性能 */
    }
  }
  
  @media (min-width: 1600px) {
    .homepage-container {
      /* 大屏优化显示 */
      background-size: 100% auto;
    }
  }
  
  /* 处理内容滚动时的背景覆盖问题 */
  .homepage-container::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: inherit;
    background-size: inherit;
    background-position: inherit;
  }
  </style>