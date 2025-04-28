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
        <h1 class="info-title">Click Smart: Building Your Digital IQ</h1>
        <p class="info-text">
            ​Digital literacy is the ability to confidently and critically use digital technologies for information, communication, and basic problem-solving across various aspects of life. It involves skills such as using computers to retrieve, assess, store, produce, present, and exchange information, as well as communicating and participating in collaborative networks via the Internet.
        </p>
      </div>
  
      <!-- 详情文字区域 -->
      <div class="detail-section">
        <h2 class="detail-title">What is Digital Citizenship?</h2>
        <div class="detail-text-block">
          <div class="detail-quote">
            Digital literacy is the ability to use digital tools safely, critically, and effectively to access, evaluate, create, and communicate information across digital spaces, fostering responsible and informed online engagement.
          </div>
          <p class="detail-text">
            Although we use digital technologies much like we navigate the offline world, we aren't always careful with how we gather, share, or create information online. Sometimes we use or trust digital content without checking its source, impacting our safety, privacy, and credibility. Meanwhile, every click, post, and message continues to shape and define our digital presence and skills.
          </p>
          <p class="detail-text">
            Digital technologies also offer powerful opportunities for everyone to access information, share knowledge, and drive innovation both online and offline. Our digital skills influence how we solve problems, learn, and collaborate, and we each have an important role to play as active and responsible digital participants.
          </p>
          <p class="detail-text"><em>Did you know:</em> Improving digital literacy across just 10 percent of a group can influence how knowledge spreads? Even one person practicing safe, critical online habits can inspire others to think more carefully and act more responsibly.</p>
          <p class="detail-text">
            Find out how to  build a smarter, safer, and more empowered online world!
          </p>
        </div>
  
        <!-- 卡片区，独立容器 -->
        <div class="cards-container">
          <div class="card">
            <h4 class="card-title">Critical Thinking Online</h4>
            <ul>
              <li>Question the source behind every piece of information.</li>
              <li>Check in with peers if you notice digital misinformation.</li>
              <li>Pause and evaluate before responding to online content.</li>
              <li>Resolve misunderstandings through respectful digital dialogue.</li>
              <li>Stand against online manipulation and false narratives.</li>
            </ul>
          </div>
          <div class="card">
            <h4 class="card-title">Smart Digital Habits</h4>
            <ul>
              <li>Use digital tools to research and verify new ideas.</li>
              <li>Share educational articles and creative projects thoughtfully.</li>
              <li>Set limits for screen time to balance work and rest.</li>
              <li>Look for reliable, peer-reviewed information sources.</li>
              <li>Credit authors and creators when reposting or remixing content.</li>
            </ul>
          </div>
          <div class="card">
            <h4 class="card-title">Responsible Sharing </h4>
            <ul>
              <li>Fact-check before reposting digital content.</li>
              <li>Attribute accurate sources in online discussions.</li>
              <li>Correct errors and debunk myths when possible.</li>
              <li>Use clear, respectful communication in digital spaces.</li>
            </ul>
          </div>
          <div class="card">
            <h4 class="card-title">Privacy and Protection</h4>
            <ul>
              <li>Keep personal data private unless necessary.</li>
              <li>Regularly review and update privacy settings.</li>
              <li>Be cautious before clicking unknown links.</li>
              <li>Report vulnerabilities to maintain secure digital spaces.</li>
            </ul>
          </div>
        </div>
  
        <!-- Rights, Privacy & Ethics 扩展区 -->
        <div class="rights-section">
          <h2 class="detail-title">Rights, Privacy &amp; Ethics</h2>
          <ul class="rights-list">
            <li>I proactively use privacy tools and account settings to safeguard my personal information online, ensuring greater control over who sees my data.</li>
            <li>I respect others’ privacy by thoughtfully considering and seeking permission before sharing their photos, posts, or personal details.</li>
            <li>I access digital content ethically—choosing legitimate platforms for music, games, videos, and respecting copyright and licensing terms.</li>
            <li>I understand my Fair Dealing rights and responsibly leverage public domain or Creative Commons resources to enrich my digital experiences.</li>
            <li>I’m aware of my rights as a citizen, consumer, and human being, and I confidently assert them when engaging in online discussions or transactions.</li>
          </ul>
        </div>
      </div>
  
      <!-- 视频，绝对定位，距离右边 5vw -->
      <div class="detail-video1">
        <iframe
          src="https://www.youtube.com/embed/8nLshfChfXg?si=09D6PYPDj9I54sos"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="detail-video2">
         <iframe
            width="560" height="315"
            src="https://www.youtube.com/embed/PsPPO1R-Zog?si=dqR5z_tV_4BQ5O74"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        >     </iframe>
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
    gap: 3vw;
    margin-top: 24px;
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
    top: 175vh; right: 5vw;
    width: 560px; height: 315px;
  }
  .detail-video2 iframe {
    width: 100%; height: 100%;
  }
  </style>
  