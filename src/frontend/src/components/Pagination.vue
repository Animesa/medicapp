<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['prev', 'next', 'goto']);
</script>

<template>
  <nav aria-label="Page navigation example" class="mt-4" >
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: currentPage <= 1 }">
        <a class="page-link" href="#" @click.prevent="emit('prev')" aria-label="Anterior" title="Anterior">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>
      <li class="page-item" :class="{ active: page === currentPage }" v-for="page in totalPages" :key="page">
        <a class="page-link" href="#" @click.prevent="emit('goto', page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
        <a class="page-link" href="#" @click.prevent="emit('next')" aria-label="Siguiente" title="Siguiente">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
</style>
