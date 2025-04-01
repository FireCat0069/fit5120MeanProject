<script setup>
import HomePage from './components/homePage.vue'
</script>

<template>
  <HomePage />
</template>

<style>
/* 全局重置样式 */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
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
