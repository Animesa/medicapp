<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  iconColor: {
    type: String,
    default: "#000",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: "Ir",
  },
  buttonClass: {
    type: String,
    default: "btn-primary",
  },
});

const emit = defineEmits(["action"]);
</script>

<template>
  <div class="card h-100 text-center" style="min-height: 300px">
    <div class="card-body d-flex flex-column justify-content-center">
      <i
        v-if="icon"
        :class="icon"
        :style="{ fontSize: '4rem', color: iconColor }"
      ></i>
      <h5 class="card-title mt-4">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
      <button class="btn mt-auto" :class="buttonClass" @click="emit('action')">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* You can add hover effects here if desired */
</style>
