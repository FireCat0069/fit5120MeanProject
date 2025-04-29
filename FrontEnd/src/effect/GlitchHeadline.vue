<template>
    <div class="glitch-container">
      <!-- data-text 用于伪元素复制文字 -->
      <h1 class="glitch" data-text="DigiWise">DigiWise</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: "GlitchHeadline",
  };
  </script>
  
  <style scoped>
  .glitch-container {
    /* 居中示例，可按需删掉 */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background: #111;
  }
  
  /* 主文字样式 */
  .glitch {
    position: relative;
    font-size: 4rem;
    color: white;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    overflow: hidden;
  }
  
  /* 用 ::before 和 ::after 复制并偏移文字，制造错位、抖动、色差 */
  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    left: 0; top: 0;
    width: 100%; height: 100%;
    clip: rect(0, 0, 0, 0);
  }
  
  /* 红色抖动层 */
  .glitch::before {
    left: 2px;
    text-shadow: -2px 0 red;
    animation: glitch-anim-1 2s infinite linear alternate-reverse;
  }
  
  /* 蓝色抖动层 */
  .glitch::after {
    left: -2px;
    text-shadow: -2px 0 cyan;
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
  }
  
  /* 水平裁剪动画——让伪元素时隐时现 */
  @keyframes glitch-anim-1 {
    0%   { clip: rect(20px, 9999px, 40px, 0); }
    10%  { clip: rect(50px, 9999px, 70px, 0); }
    20%  { clip: rect(10px, 9999px, 30px, 0); }
    30%  { clip: rect(80px, 9999px, 100px, 0); }
    40%  { clip: rect(30px, 9999px, 50px, 0); }
    50%  { clip: rect(60px, 9999px, 80px, 0); }
    60%  { clip: rect(20px, 9999px, 40px, 0); }
    70%  { clip: rect(90px, 9999px, 110px, 0); }
    80%  { clip: rect(40px, 9999px, 60px, 0); }
    90%  { clip: rect(70px, 9999px, 90px, 0); }
    100% { clip: rect(10px, 9999px, 30px, 0); }
  }
  
  @keyframes glitch-anim-2 {
    0%   { clip: rect(60px, 9999px, 80px, 0); }
    10%  { clip: rect(30px, 9999px, 50px, 0); }
    20%  { clip: rect(80px, 9999px, 100px, 0); }
    30%  { clip: rect(10px, 9999px, 30px, 0); }
    40%  { clip: rect(50px, 9999px, 70px, 0); }
    50%  { clip: rect(20px, 9999px, 40px, 0); }
    60%  { clip: rect(90px, 9999px, 110px, 0); }
    70%  { clip: rect(40px, 9999px, 60px, 0); }
    80%  { clip: rect(70px, 9999px, 90px, 0); }
    90%  { clip: rect(20px, 9999px, 40px, 0); }
    100% { clip: rect(60px, 9999px, 80px, 0); }
  }
  </style>
  