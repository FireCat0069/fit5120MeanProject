<template>
  <div class="page-container">
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
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #FDF8EE;
  overflow: hidden;
  box-sizing: border-box;
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
  top: 20vh;
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
</style>
