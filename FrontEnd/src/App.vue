<script setup>

</script>

<template>
  <router-view />
</template>

<style>
/* 全局重置样式 */
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 200vh; /* 页面高度手动设置为两屏 */
  overflow-x: hidden; /* 禁止横向滚动 */
  overflow-y: auto;   /* 启用垂直滚动 */
  background-color: #FDF8EE;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

/* 页面切换动画（可选） */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
