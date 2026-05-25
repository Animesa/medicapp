<script setup>
import { isAuthenticated } from "../utils/auth.js";
import Dashboard from "../components/Dashboard.vue";
import LandingPage from "../components/LandingPage.vue";
</script>

<template>
  <div>
    <Dashboard v-if="isAuthenticated" />
    <LandingPage v-else />
  </div>
</template>

<style scoped>
</style>