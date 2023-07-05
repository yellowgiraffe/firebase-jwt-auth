<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
    authStore.userInfo.expiresIn = tokens.expiresIn
  }
}
checkUser()
</script>
<template>
  <div class="menu">
    <router-link to="/" class="menu__link">Home</router-link>
    <router-link to="/signin" v-if="!token" class="menu__link">Login</router-link>
    <router-link to="/cars" v-if="token" class="menu__link">Cars</router-link>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  max-width: 700px;
  font-family: Arial, Helvetica, sans-serif;
}

.menu {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;
}

.menu__link {
  color: #000;
  margin: 0 20px;
  font-family: 'Arial', sans-serif;
}
</style>
