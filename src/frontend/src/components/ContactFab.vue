<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  email: {
    type: String,
    default: 'contacto@medicapp.com'
  },
  title: {
    type: String,
    default: 'Contáctenos'
  },
  icon: {
    type: String,
    default: 'bi-chat-heart-fill'
  }
});
</script>

<template>
  <a :href="`mailto:${email}`" class="contact-fab" :title="title">
    <i class="bi" :class="icon"></i>
  </a>
</template>

<style scoped>
.contact-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 65px;
  height: 65px;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  text-decoration: none;
  z-index: 1000;
  animation: heartbeat 2s infinite;
  box-shadow: 0 4px 15px rgba(255, 65, 108, 0.4);
  transition: filter 0.2s ease;
}

.contact-fab:hover {
  color: white;
  filter: brightness(1.1);
}

@keyframes heartbeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.15); }
  28% { transform: scale(1); }
  42% { transform: scale(1.15); }
  70% { transform: scale(1); }
  100% { transform: scale(1); }
}
</style>
