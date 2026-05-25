<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { setToken } from './utils/auth.js'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  if (token) {
    setToken(token)
    router.replace({ path: '/' })
  }
})
</script>

<template>
  <Navbar />
  <div class="main-content">
    <router-view />
  </div>
</template>

<style scoped>
.main-content {
  padding-top: 80px;
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>
