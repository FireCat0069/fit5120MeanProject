<template>
  <!-- 第一屏 -->
  <div class="page-container first-section">
    <!-- 顶部右侧导航 -->
    <div class="nav-bar">
      <span>Home</span>
      <span>Quiz Bank</span>
      <span>Contact us</span>
    </div>

    <!-- 左侧大标题和描述 -->
    <div class="main-title">
      <div>
        <span class="title-black">Digital Safe </span>
        <span class="title-orange">Ready</span>
      </div>
      <div>
        <span class="title-black">Future </span>
        <span class="title-orange">Steady</span>
      </div>
      <p class="sub-text">
        Today’s digital world demands more than access—it requires awareness.
        <strong> DigitalShield </strong>
        equips university students with the tools to stay safe, spot misinformation, and become responsible digital citizens.
      </p>

      <!-- 假搜索框 -->
      <div class="fake-search">
        <span class="search-label">Are You a Smart Digital Citizen?</span>
        <button class="go-button">Go test</button>
      </div>
    </div>
  </div>

  <!-- 第二屏：白色卡片区域 -->
  <div class="page-container second-section">
    <div class="red-card-container">
      <div class="red-card">1</div>
      <div class="red-card">2</div>
      <div class="red-card">3</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
};
</script>

<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
}

/* 第一屏 Hero 区 */
.first-section {
  top: 0;
  background-image: url('@/assets/background1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  box-sizing: border-box;
}

/* 第二屏白色页面 */
.second-section {
  top: 100vh;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 卡片容器 */
.red-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3vw;
}

/* 单个白卡片 */
.red-card {
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 48px;
  font-weight: bold;
  color: #3E245F;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 导航栏 */
.nav-bar {
  position: absolute;
  top: 5vh;
  right: 5vw;
  display: flex;
  gap: 3vw;
  font-size: 24px;
  color: #1D1D1D;
  white-space: nowrap;
}

/* 主标题块 */
.main-title {
  position: absolute;
  top: 30vh;
  left: 10vw;
  max-width: 600px;
}

/* 标题颜色 */
.title-black {
  font-size: 48px;
  font-weight: 700;
  color: #050C26;
}

.title-orange {
  font-size: 48px;
  font-weight: 700;
  color: #F18829;
}

/* 描述段落 */
.sub-text {
  font-size: 16px;
  color: #4a4a4a;
  margin-top: 20px;
  line-height: 1.6;
}

/* 假搜索框 */
.fake-search {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 14px 24px;
  margin-top: 30px;
  width: fit-content;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-label {
  font-size: 18px;
  font-weight: bold;
  color: #1D1D1D;
  margin-right: 24px;
  white-space: nowrap;
}

.go-button {
  background-color: #3E245F;
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 28px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}
</style>
