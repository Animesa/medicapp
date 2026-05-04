<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["back"]);
</script>

<template>
  <button class="btn btn-outline-secondary mb-3" @click="emit('back')">
    <i class="bi bi-arrow-left"></i>
  </button>
</template>

<style scoped>
</style>