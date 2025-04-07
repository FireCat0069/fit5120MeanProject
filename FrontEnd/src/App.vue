<template>
  <router-view />
</template>

<script>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    // 监听路由变化
    watch(
      () => route.path,
      (newPath) => {
        if (newPath === '/quiz-bank') {
          document.body.style.overflow = 'hidden' // 锁定滚动
        } else {
          document.body.style.overflow = 'auto' // 恢复滚动
        }
      },
      { immediate: true }
    )
  }
}
</script>

<style>
/* 全局重置样式 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  /*height: 200vh;  页面高度手动设置为两屏 */
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
