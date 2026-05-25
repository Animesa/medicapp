<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  iconColor: {
    type: String,
    required: true
  },
  iconBg: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="service-card p-4 text-center h-100 shadow-sm rounded-4">
    <div class="icon-container mb-4 mx-auto" :style="{ background: iconBg, color: iconColor }">
      <i class="bi fs-2" :class="icon"></i>
    </div>
    <h5 class="fw-bold mb-3">{{ title }}</h5>
    <p class="text-muted small mb-0">{{ description }}</p>
  </div>
</template>

<style scoped>
.service-card {
  background: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.08) !important;
}

.icon-container {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.service-card:hover .icon-container {
  transform: scale(1.1) rotate(5deg);
}
</style>
