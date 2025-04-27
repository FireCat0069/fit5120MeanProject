<template>
    <div class="page-container">
      <!-- 背景图：绝对定位贴左上，宽铺满，按 70vh 显示 -->
      <img class="bg-img" src="@/assets/SMP.png" alt="Background" />
  
      <!-- 导航栏 -->
      <div class="nav-bar">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/quiz-bank" class="nav-link">Quiz Bank</router-link>
        <span class="nav-link">Contact us</span>
      </div>
  
      <!-- 覆盖层内容 -->
      <div class="overlay-content">
        <!-- 给标题加上 glitch 类以应用故障效果 -->
        <h1 class="info-title glitch">
          Building Your Privacy Fortress Online
        </h1>
        <p class="info-text">
          Social Media Privacy is about protecting personal information shared online. By managing privacy settings and limiting what you post, you can control your digital identity and reduce risks like data breaches and unwanted surveillance.
        </p>
      </div>
  
      <!-- 详情文字区域 -->
      <div class="detail-section">
        <h2 class="detail-title">What is Social Media Privacy?</h2>
        <div class="detail-text-block">
          <div class="detail-quote">
            Social media privacy is the ability to protect our personal information in digital spaces, ensuring we engage safely, responsibly, and with control over what we share.
          </div>
          <p class="detail-text">
            Although we connect and communicate through social media much like we do in real life, we’re not always fully aware of the risks involved. We might share details without realizing how it could impact our privacy, safety, and online reputation. Every post, like, and comment shapes our digital identity and affects how others perceive us.</p>
          <p class="detail-text">
            Social platforms also offer unique ways for people to express themselves, advocate for causes, and influence positive change online and beyond. Our behavior and awareness on social media can create lasting effects, making it vital for each of us to take an active role in protecting our personal data.
        </p>
          <p class="detail-text"><em>Did you know:</em> It only takes one careless post for sensitive information to spread widely. Even a small mistake can make your private details vulnerable to misuse, highlighting the importance of setting strong privacy controls and thinking carefully before sharing.</p>
          <p class="detail-text">
            Discover how you can manage your privacy settings, stay informed about platform policies, and become a smarter social media user by joining MediaSmarts’ annual Privacy Awareness Campaign!
          </p>
        </div>
  
        <!-- 卡片区，独立容器 -->
        <div class="cards-container">
        <div class="card">
            <h4 class="card-title">Compassion & Online Community</h4>
            <ul>
            <li>Remember there's a real person behind every account.</li>
            <li>Support others if you witness cyberbullying.</li>
            <li>Pause before reacting emotionally online.</li>
            <li>Settle disputes face-to-face when possible.</li>
            <li>Speak out against hate and discrimination.</li>
        </ul>
        </div>
          <div class="card">
            <h4 class="card-title">Empowering Digital Use</h4>
            <ul>
              <li>Use technology tools to discover fresh perspectives and skills.</li>
              <li>Share valuable and educational content to inspire others.</li>
              <li>Maintain balance by setting limits on screen use.</li>
              <li>Look for information that is verified and trustworthy.</li>
              <li>Acknowledge original creators when reposting their materials.</li>
            </ul>
          </div>
          <div class="card">
            <h4 class="card-title">Smart Sharing Habits</h4>
            <ul>
              <li>Double-check information before sharing it with others.</li>
              <li>Use trustworthy sources when joining online conversations.</li>
              <li>Address and correct misinformation when possible.</li>
              <li>Communicate with kindness and respect across platforms.</li>
            </ul>
          </div>
          <div class="card">
            <h4 class="card-title">Protecting Privacy & Ethics</h4>
            <ul>
              <li>Never disclose sensitive personal information without consent.</li>
              <li>Review and update your privacy settings regularly.</li>
              <li>Be cautious and think twice before clicking unknown links.</li>
              <li>Report potential security issues to help protect communities.</li>
            </ul>
          </div>
        </div>
  
        <!-- Rights, Privacy & Ethics 扩展区 -->
        <div class="rights-section">
          <h2 class="detail-title">Tips for Protecting Your Privacy</h2>
          <ul class="rights-list">
            <li>Review Privacy Settings: Regularly check and adjust your privacy settings on each platform.</li>
            <li>Limit Sharing: Be cautious about the personal information you share publicly.</li>
            <li>Use Strong Passwords: Employ complex passwords and enable two-factor authentication.</li>
            <li>Be Wary of Third-Party Apps: Only authorize trusted applications to access your social media accounts.​</li>
            <li>Stay Informed: Keep up-to-date with the latest privacy practices and potential threats.</li>
          </ul>
        </div>
      </div>
  
      <!-- 视频，绝对定位，距离右边 5vw -->
      <div class="detail-video1">
  <iframe
    src="https://www.youtube.com/embed/se2pELXlMo8?si=zrLYuFBrNn3S42Pe"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

<div class="detail-video2">
  <iframe
    width="560" height="315"
    src="https://www.youtube.com/embed/sMLVkBxke20?si=w5zoSjgh040w-0bu"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

    </div>
  </template>
  
  <script>
  import { PowerGlitch } from 'powerglitch'
  
  export default {
    name: 'SMP',
    mounted() {
      PowerGlitch.glitch('.glitch', {
        playMode: 'always',
        createContainers: true,
        timing: {
          duration: 1500,
          iterations: Infinity
        },
      slice: {
        hueRotate: true
      }
      })
    }
  }
  </script>
  
  <style scoped>
  /* 页面进入动画 */
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  /* 容器 */
  .page-container {
    position: absolute;
    top: 0; left: 0;
    width: 100vw; height: 300vh;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  
  /* 背景图 */
  .bg-img {
    position: absolute; top: 0; left: 0;
    width: 100vw; height: 70vh;
    object-fit: cover;
    pointer-events: none;
  }
  
  /* 导航栏 */
  .nav-bar {
    position: absolute; top: 2vh; right: 5vw;
    display: flex; gap: 3vw;
    font-size: 24px; white-space: nowrap;
  }
  .nav-link {
    color: #fff; text-decoration: none;
  }
  .nav-link:hover {
    text-decoration: underline;
  }
  
  /* 覆盖层 */
  .overlay-content {
    position: absolute;
    top: 10vh; left: 5vw;
    transform: translateY(-50%);
    max-width: 600px;
    animation: fadeInUp 1s ease-out both;
    animation-delay: 0.3s;
  }
  .info-title {
    font-size: 48px; font-weight: 700;
    color: #fff; margin-bottom: 16px;
  }
  .info-text {
    font-size: 20px; color: #fff;
    line-height: 1.6;
  }
  
  /* 详情区 */
  .detail-section {
    position: absolute;
    top: 73vh; left: 5vw;
    width: 55vw; max-width: 800px;
    animation: fadeInUp 1s ease-out both;
    animation-delay: 0.6s;
  }
  .detail-title {
    font-size: 28px;
    margin-bottom: 12px;
    color: #2c3e50;
  }
  .detail-quote {
    border-left: 4px solid #9b59b6;
    padding-left: 16px;
    font-size: 18px; color: #8e44ad;
    margin-bottom: 16px; line-height: 1.6;
  }
  .detail-text {
    font-size: 18px; color: #2c3e50;
    margin-bottom: 16px; line-height: 1.6;
  }
  .detail-text em {
    font-style: italic;
  }
  
  /* 卡片布局 */
  .cards-container {
    display: flex;
    width: 100vw;
    gap: 2vw;
    margin-top: 3vh;
    flex-wrap: wrap;
  }
  .card {
    background: #fff;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 16px;
    width: 20vw;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
  .card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  .card-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #34495e;
  }
  .card ul {
    list-style: disc inside;
    margin: 0;
    padding: 0;
  }
  .card li {
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 1.5;
    color: #000;
  }
  
  /* Rights, Privacy & Ethics 扩展区 */
  .rights-section {
    margin-top: 3vh;
    width: 55vw; max-width: 800px;
  }
  .rights-list {
    padding-left: 20px;
    list-style: disc inside;
  }
  .rights-list li {
    margin-bottom: 12px;
    font-size: 18px;
    color: #2c3e50;
    line-height: 1.6;
  }
  
  /* 视频 */
  .detail-video1 {
    position: absolute;
    top: 80vh; right: 5vw;
    width: 560px; height: 315px;
  }
  .detail-video1 iframe {
    width: 100%; height: 100%;
  }
  .detail-video2 {
    position: absolute;
    top: 182vh; right: 5vw;
    width: 560px; height: 315px;
  }
  .detail-video2 iframe {
    width: 100%; height: 100%;
  }
  </style>
  