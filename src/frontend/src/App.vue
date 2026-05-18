<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  if (token) {
    localStorage.setItem('auth_token', token);
    router.replace({ path: '/' })
  }
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
