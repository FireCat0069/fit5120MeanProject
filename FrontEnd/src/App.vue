<script setup>
import HomePage from './components/homePage.vue'
</script>

<template>
  <HomePage />
</template>

<style scoped>
/* Lock horizontal scrolling globally */
:global(body) {
  overflow-x: hidden;
  margin: 0;
}
</style>
