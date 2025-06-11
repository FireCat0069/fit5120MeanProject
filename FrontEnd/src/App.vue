<template>
  <div>
    <!-- Password input mask layer -->
    <div v-if="showPasswordPrompt" class="password-overlay">
      <div class="password-box">
        <h2>Please enter access code</h2>
        <input type="password" v-model="inputPassword" placeholder="Enter password" />
        <button @click="checkPassword">Submit</button>
        <p v-if="error" class="error-msg">Incorrect password. Try again.</p>
      </div>
    </div>

    <!-- Page Content -->
    <router-view v-else />
  </div>
</template>

<script>
import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    // Listen for route switching and control page scrolling behavior
    watch(
      () => route.path,
      (newPath) => {
        if (newPath === '/quiz-bank') {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'auto'
        }
      },
      { immediate: true }
    )

    // Password verification function
    const showPasswordPrompt = ref(true)
    const inputPassword = ref('')
    const error = ref(false)

    onMounted(() => {
      if (sessionStorage.getItem('digiwise-unlocked') === 'true') {
        showPasswordPrompt.value = false
      }
    })

    const checkPassword = () => {
      if (inputPassword.value === 'TP20') {
        sessionStorage.setItem('digiwise-unlocked', 'true')
        showPasswordPrompt.value = false
      } else {
        error.value = true
      }
    }

    return {
      route,
      showPasswordPrompt,
      inputPassword,
      error,
      checkPassword
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #FDF8EE;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Password verification style */
.password-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.password-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.password-box input {
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  width: 200px;
}

.password-box button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #f18829;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.error-msg {
  color: red;
  margin-top: 10px;
}
</style>
