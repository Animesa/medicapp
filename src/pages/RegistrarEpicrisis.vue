<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const citas = ref([
  {
    id: 1,
    medico: 'Dr. Juan Pérez',
    especialidad: 'Cardiología',
    fecha: new Date(2026, 3, 20),
    hora: '10:00',
    paciente: 'Juan García'
  },
  {
    id: 2,
    medico: 'Dra. María López',
    especialidad: 'Pediatría',
    fecha: new Date(2026, 3, 20),
    hora: '14:00',
    paciente: 'Ana Martínez'
  },
  {
    id: 3,
    medico: 'Dr. Carlos Ramírez',
    especialidad: 'Ginecología',
    fecha: new Date(2026, 3, 21),
    hora: '09:00',
    paciente: 'María Rodríguez'
  }
])

const citaId = route.params.id
const cita = computed(() => citas.value.find(c => c.id == citaId))

const form = ref({
  diagnostico: '',
  tratamiento: '',
  medicamentos: '',
  recomendaciones: '',
  notas: ''
})

const submitForm = () => {
  console.log('Epicrisis registrada:', {
    cita: cita.value,
    epicrisis: form.value
  })
  alert('Epicrisis registrada exitosamente!')
  router.push('/')
}
</script>

<template>
  <div class="container mt-5">
    <button class="btn btn-outline-secondary mb-3" @click="router.push('/')"><i class="bi bi-arrow-left"></i></button>
    <h1>Registrar Epicrisis</h1>
    <div v-if="cita" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Cita de {{ cita.paciente }}</h5>
        <p class="card-text">
          <strong>Médico:</strong> {{ cita.medico }} ({{ cita.especialidad }})<br>
          <strong>Fecha:</strong> {{ cita.fecha.toLocaleDateString() }}<br>
          <strong>Hora:</strong> {{ cita.hora }}
        </p>
      </div>
    </div>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="mb-3">
        <label for="diagnostico" class="form-label">Diagnóstico</label>
        <textarea id="diagnostico" class="form-control" v-model="form.diagnostico" rows="3" required></textarea>
      </div>
      <div class="mb-3">
        <label for="tratamiento" class="form-label">Tratamiento</label>
        <textarea id="tratamiento" class="form-control" v-model="form.tratamiento" rows="3" required></textarea>
      </div>
      <div class="mb-3">
        <label for="medicamentos" class="form-label">Medicamentos</label>
        <textarea id="medicamentos" class="form-control" v-model="form.medicamentos" rows="2" placeholder="Lista de medicamentos prescritos"></textarea>
      </div>
      <div class="mb-3">
        <label for="recomendaciones" class="form-label">Recomendaciones</label>
        <textarea id="recomendaciones" class="form-control" v-model="form.recomendaciones" rows="3" placeholder="Recomendaciones para el paciente"></textarea>
      </div>
      <div class="mb-3">
        <label for="notas" class="form-label">Notas Adicionales</label>
        <textarea id="notas" class="form-control" v-model="form.notas" rows="2" placeholder="Notas adicionales"></textarea>
      </div>
      <button type="submit" class="btn btn-success">Registrar Epicrisis</button>
    </form>
  </div>
</template>

<style scoped></style>