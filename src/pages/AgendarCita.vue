<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const medicos = ref([
  { id: 1, nombre: 'Dr. Juan Pérez', especialidad: 'Cardiología' },
  { id: 2, nombre: 'Dra. María López', especialidad: 'Pediatría' },
  { id: 3, nombre: 'Dr. Carlos Ramírez', especialidad: 'Ginecología' },
  { id: 4, nombre: 'Dra. Ana González', especialidad: 'Dermatología' }
])

const form = ref({
  medicoId: '',
  fecha: '',
  hora: '',
  motivo: ''
})

const selectedMedico = computed(() => {
  return medicos.value.find(m => m.id == form.value.medicoId)
})

const especialidad = computed(() => {
  return selectedMedico.value ? selectedMedico.value.especialidad : ''
})

const submitForm = () => {
  if (!selectedMedico.value) {
    alert('Por favor, seleccione un médico.')
    return
  }
  console.log('Datos de la cita:', {
    medico: selectedMedico.value.nombre,
    especialidad: especialidad.value,
    fecha: form.value.fecha,
    hora: form.value.hora,
    motivo: form.value.motivo
  })
  alert('Cita agendada exitosamente!')
}
</script>

<template>
  <div class="container mt-5">
    <button class="btn btn-outline-secondary mb-3" @click="router.push('/')"><i class="bi bi-arrow-left"></i></button>
    <h1>Agendar Cita</h1>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="mb-3">
        <label for="medico" class="form-label">Seleccionar Médico</label>
        <select id="medico" class="form-select" v-model="form.medicoId" required>
          <option value="">Seleccione un médico...</option>
          <option v-for="medico in medicos" :key="medico.id" :value="medico.id">
            {{ medico.nombre }}
          </option>
        </select>
      </div>
      <div class="mb-3" v-if="especialidad">
        <label class="form-label">Especialidad</label>
        <input type="text" class="form-control" :value="especialidad" readonly>
      </div>
      <div class="mb-3">
        <label for="fecha" class="form-label">Fecha de la Cita</label>
        <input type="date" id="fecha" class="form-control" v-model="form.fecha" required>
      </div>
      <div class="mb-3">
        <label for="hora" class="form-label">Hora de la Cita</label>
        <input type="time" id="hora" class="form-control" v-model="form.hora" required>
      </div>
      <div class="mb-3">
        <label for="motivo" class="form-label">Motivo de la Consulta</label>
        <textarea id="motivo" class="form-control" v-model="form.motivo" rows="3" placeholder="Describa brevemente el motivo de la consulta"></textarea>
      </div>
      <button type="submit" class="btn btn-warning">Agendar Cita</button>
    </form>
  </div>
</template>

<style scoped></style>