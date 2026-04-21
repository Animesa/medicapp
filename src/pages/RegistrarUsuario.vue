<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  tipoDocumento: '',
  numeroDocumento: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  correo: '',
  telefono: ''
})

const submitForm = () => {
  console.log('Datos del formulario:', form.value)
  alert('Usuario registrado exitosamente!')
}
</script>

<template>
  <div class="container mt-5">
    <button class="btn btn-outline-secondary mb-3" @click="router.push('/')"><i class="bi bi-arrow-left"></i></button>
    <h1>Registrar Usuario</h1>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="mb-3">
        <label for="tipoDocumento" class="form-label">Tipo de Documento</label>
        <select id="tipoDocumento" class="form-select" v-model="form.tipoDocumento" required>
          <option value="">Seleccione...</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="PAS">Pasaporte</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="numeroDocumento" class="form-label">Número de Documento</label>
        <input type="text" id="numeroDocumento" class="form-control" v-model="form.numeroDocumento" @input="form.numeroDocumento = form.numeroDocumento.replace(/\D/g, '')" placeholder="Ej: 1234567890" required>
      </div>
      <div class="mb-3">
        <label for="nombres" class="form-label">Nombres</label>
        <input type="text" id="nombres" class="form-control" v-model="form.nombres" placeholder="Ej: Juan Carlos" required>
      </div>
      <div class="mb-3">
        <label for="apellidos" class="form-label">Apellidos</label>
        <input type="text" id="apellidos" class="form-control" v-model="form.apellidos" placeholder="Ej: Pérez González" required>
      </div>
      <div class="mb-3">
        <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
        <input type="date" id="fechaNacimiento" class="form-control" v-model="form.fechaNacimiento" required>
      </div>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo Electrónico</label>
        <input type="email" id="correo" class="form-control" v-model="form.correo" placeholder="Ej: juan@example.com" required>
      </div>
      <div class="mb-3">
        <label for="telefono" class="form-label">Teléfono</label>
        <input type="tel" id="telefono" class="form-control" v-model="form.telefono" @input="form.telefono = form.telefono.replace(/\D/g, '')" placeholder="Ej: 3001234567" required>
      </div>
      <button type="submit" class="btn btn-primary">Registrar Usuario</button>
    </form>
  </div>
</template>

<style scoped></style>