<template>
    <div class="page-container">
      <!-- 背景图：绝对定位贴左上，宽铺满，按 70vh 显示 -->
      <img class="bg-img" src="@/assets/DA.png" alt="Background" />
  
      <!-- 导航栏 -->
      <div class="nav-bar">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/quiz-bank" class="nav-link">Quiz Bank</router-link>
        <span class="nav-link">Contact us</span>
      </div>
  
      <!-- 覆盖层内容 -->
      <div class="overlay-content">
        <h1 class="info-title">Facing Digital Aggression</h1>
        <p class="info-text">
          Digital aggression refers to harmful behaviors that occur through digital platforms, such as hurtful messages, exclusion, or spreading false information. It can affect people’s well-being and create unsafe online spaces. By understanding and addressing digital aggression, we can build a more positive and respectful digital community.
        </p>
      </div>
  
      <!-- 详情文字区域 -->
      <div class="detail-section">
        <h2 class="detail-title">What is Digital Aggression?</h2>
        <div class="detail-text-block">
          <div class="detail-quote">
            Digital aggression refers to harmful or hostile behaviors carried out through digital platforms, emphasizing the need for respectful, responsible, and thoughtful engagement in online communities.
          </div>
          <p class="detail-text">
            Although communication online mirrors many aspects of offline interaction, emotional distance and anonymity often reduce mindfulness in digital behavior. Harmful comments, exclusion, or targeted harassment can damage reputations, mental well-being, and community trust. Every interaction in digital spaces shapes personal and collective experiences, influencing how digital environments evolve.
          </p>
          <p class="detail-text">
            Digital platforms offer opportunities to build supportive, inclusive spaces and advocate against harmful behaviors. Positive actions in online environments can counteract digital aggression and foster communities where respect and empathy guide interactions. Everyone has a part in shaping safe digital cultures.
          </p>
          <p class="detail-text"><em>Did you know:</em> Just 10 percent of a digital community demonstrating respect and inclusion can shift the tone of online spaces? Even one supportive voice can encourage others to act thoughtfully and resist digital aggression.</p>
          <p class="detail-text">
            Learn how to contribute to building safer, more empathetic online spaces!
          </p>
        </div>
  
        <!-- 卡片区，独立容器 -->
        <div class="cards-container">
          <div class="card">
            <h4 class="card-title">Recognizing Digital Aggression</h4>
            <ul>
              <li>Identify harassment, exclusion, and harmful digital behavior.</li>
              <li>Watch for repeated hostile actions online.</li>
              <li>Spot language that intimidates or mocks others.</li>
              <li>Distinguish respectful disagreement from personal attacks.</li>
              <li>Detect attempts to silence or isolate individuals.</li>
            </ul>
          </div>
          <div class="card">
            <h4 class="card-title">Positive Technology Use</h4>
            <ul>
              <li>Encourage respectful dialogue and active listening.</li>
              <li>Share positive and educational digital content.</li>
              <li>Set clear boundaries for online interactions.</li>
              <li>Support creators who promote kindness and inclusion.</li>
              <li>Engage with communities that model respectful behavior.</li>
            </ul>
          </div>
          <div class="card">
            <h4 class="card-title">Responding to Harmful Conduct</h4>
            <ul>
              <li>Report abusive messages, threats, and harmful posts to platform moderators.</li>
              <li>Document instances of digital aggression to support investigations or further action.</li>
              <li>Avoid amplifying harmful content by not reposting or sharing it.</li>
              <li>Use clear, firm communication to challenge aggressive behaviors when safe to do so.</li>
            </ul>
          </div>
          <div class="card">
            <h4 class="card-title">Safeguarding Digital Communities</h4>
            <ul>
              <li>Support guidelines and initiatives that promote safe and inclusive online spaces.</li>
              <li>Advocate for transparency in moderation and anti-abuse policies on digital platforms.</li>
              <li>Stay informed about tools and settings that protect against harassment and exposure to harmful content.</li>
              <li>Contribute to building resilient digital communities by fostering kindness and accountability.</li>
            </ul>
          </div>
        </div>
  
        <!-- Rights, Privacy & Ethics 扩展区 -->
        <div class="rights-section">
          <h2 class="detail-title">Legal Awareness in Digital Spaces</h2>
          <ul class="rights-list">
            <li>Utilize privacy laws and platform reporting tools to safeguard personal information and minimize exposure to online harassment.</li>
            <li>Respect digital rights by seeking consent before sharing others' images, messages, or private details in any public forum.</li>
            <li>Access and share content through legitimate sources, ensuring compliance with copyright, intellectual property, and communication laws.</li>
            <li>Understand legal protections against digital threats and use reporting mechanisms to document and address unlawful behavior.</li>
            <li>Recognize personal rights under cybercrime and harassment laws, and seek appropriate legal support when facing serious online misconduct.</li>
          </ul>
        </div>
      </div>
  
      <!-- 视频，绝对定位，距离右边 5vw -->
      <div class="detail-video1">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/1dYgE4nv5i4?si=vDTFqp27zozvR3xk"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

<div class="detail-video2">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/oaZKeMnEzqQ?si=oz_fr3lkEahI8eOx"
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
    margin-top: 102%; 
    left: 60vw;
    width: 560px; height: 315px;
  }
  .detail-video2 iframe {
    width: 100%; height: 100%;
  }
  </style>
  