<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
import { API_BASE_URL } from '../config.js'

const form = ref({
  tipoDocumento: '',
  numeroDocumento: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  correo: '',
  telefono: ''
})

const tiposDocumento = ref([])

const loadTiposDocumento = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/catalogos/nombre/TIPOS DE DOCUMENTO`)
    if (res.ok) {
      const catalogo = await res.json()
      if (catalogo && catalogo.valores) {
        tiposDocumento.value = catalogo.valores.filter(v => v.activo)
      }
    }
  } catch (err) {
    console.error('Error cargando tipos de documento', err)
  }
}

onMounted(() => {
  loadTiposDocumento()
})

const submitForm = async () => {
  if (!form.value.tipoDocumento) {
    Swal.fire('Atención', 'Por favor seleccione un Tipo de Documento.', 'warning')
    return
  }

  try {
    const res = await fetch(`${API_BASE_URL}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    
    if (res.ok) {
      Swal.fire('Éxito', 'Paciente registrado exitosamente', 'success')
      form.value = {
        tipoDocumento: '',
        numeroDocumento: '',
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        correo: '',
        telefono: ''
      }
    } else {
      const errorData = await res.json()
      Swal.fire('Error', errorData.error || 'Ocurrió un error al registrar el paciente', 'error')
    }
  } catch (err) {
    console.error(err)
    Swal.fire('Error', 'Ocurrió un error de conexión', 'error')
  }
}
</script>

<template>
  <div class="container mt-5">
    <button class="btn btn-outline-secondary mb-3" @click="router.push('/')"><i class="bi bi-arrow-left"></i></button>
    <h1>Registrar Paciente</h1>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="mb-3">
        <label for="tipoDocumento" class="form-label">Tipo de Documento</label>
        <select id="tipoDocumento" class="form-select" v-model="form.tipoDocumento" required>
          <option value="">Seleccione...</option>
          <option v-for="tipo in tiposDocumento" :key="tipo.clave" :value="tipo.clave">
            {{ `${tipo.clave} - ${tipo.valor}` }}
          </option>
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
        <input type="tel" id="telefono" class="form-control" v-model="form.telefono" @input="form.telefono = form.telefono.replace(/\D/g, '')" placeholder="Ej: 3001234567" maxlength="10" required>
      </div>
      <button type="submit" class="btn btn-primary">Registrar Paciente</button>
    </form>
  </div>
</template>

<style scoped></style>