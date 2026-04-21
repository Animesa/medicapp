<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  registroMedico: '',
  nombres: '',
  apellidos: '',
  especialidad: '',
  telefono: ''
})

const submitForm = () => {
  console.log('Datos del formulario:', form.value)
  alert('Médico registrado exitosamente!')
}
</script>

<template>
  <div class="container mt-5">
    <button class="btn btn-outline-secondary mb-3" @click="router.push('/')"><i class="bi bi-arrow-left"></i></button>
    <h1>Registrar Médico</h1>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="mb-3">
        <label for="registroMedico" class="form-label">Registro Médico</label>
        <input type="text" id="registroMedico" class="form-control" v-model="form.registroMedico" @input="form.registroMedico = form.registroMedico.replace(/\D/g, '')" placeholder="Ej: 123456789" required>
      </div>
      <div class="mb-3">
        <label for="nombres" class="form-label">Nombres</label>
        <input type="text" id="nombres" class="form-control" v-model="form.nombres" placeholder="Ej: María José" required>
      </div>
      <div class="mb-3">
        <label for="apellidos" class="form-label">Apellidos</label>
        <input type="text" id="apellidos" class="form-control" v-model="form.apellidos" placeholder="Ej: López Ramírez" required>
      </div>
      <div class="mb-3">
        <label for="especialidad" class="form-label">Especialidad</label>
        <select id="especialidad" class="form-select" v-model="form.especialidad" required>
          <option value="">Seleccione...</option>
          <option value="cardiologia">Cardiología</option>
          <option value="pediatria">Pediatría</option>
          <option value="ginecologia">Ginecología</option>
          <option value="dermatologia">Dermatología</option>
          <option value="oftalmologia">Oftalmología</option>
          <option value="ortopedia">Ortopedia</option>
          <option value="psiquiatria">Psiquiatría</option>
          <option value="medicina-general">Medicina General</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="telefono" class="form-label">Teléfono</label>
        <input type="tel" id="telefono" class="form-control" v-model="form.telefono" @input="form.telefono = form.telefono.replace(/\D/g, '')" placeholder="Ej: 3001234567" required>
      </div>
      <button type="submit" class="btn btn-success">Registrar Médico</button>
    </form>
  </div>
</template>

<style scoped></style>