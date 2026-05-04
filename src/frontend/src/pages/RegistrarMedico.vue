<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
import { API_BASE_URL } from '../config.js'

const form = ref({
  registroMedico: '',
  nombres: '',
  apellidos: '',
  especialidad: '',
  telefono: ''
})

const especialidades = ref([])
const searchEspecialidad = ref('')
const showDropdown = ref(false)

const loadEspecialidades = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/catalogos/nombre/ESPECIALIDADES`)
    if (res.ok) {
      const catalogo = await res.json()
      if (catalogo && catalogo.valores) {
        especialidades.value = catalogo.valores.filter(v => v.activo)
      }
    }
  } catch (err) {
    console.error('Error cargando especialidades', err)
  }
}

const filteredEspecialidades = computed(() => {
  if (!searchEspecialidad.value) return especialidades.value
  const s = searchEspecialidad.value.toLowerCase()
  return especialidades.value.filter(t => t.valor.toLowerCase().includes(s) || t.clave.toLowerCase().includes(s))
})

const selectEspecialidad = (esp) => {
  form.value.especialidad = esp.clave
  searchEspecialidad.value = `${esp.valor} (${esp.clave})`
  showDropdown.value = false
}

const hideDropdown = () => {
  setTimeout(() => { showDropdown.value = false }, 200)
}

onMounted(() => {
  loadEspecialidades()
})

const submitForm = async () => {
  // Auto-select si el texto escrito coincide exactamente con algún valor o clave
  const match = especialidades.value.find(t => 
    t.valor.toLowerCase() === searchEspecialidad.value.toLowerCase() || 
    t.clave.toLowerCase() === searchEspecialidad.value.toLowerCase() ||
    `${t.valor.toLowerCase()} (${t.clave.toLowerCase()})` === searchEspecialidad.value.toLowerCase()
  )
  if (match) {
    form.value.especialidad = match.clave
  }

  if (!form.value.especialidad) {
    Swal.fire('Atención', 'Por favor busque y seleccione una Especialidad de la lista.', 'warning')
    return
  }

  try {
    const res = await fetch(`${API_BASE_URL}/medicos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    
    if (res.ok) {
      Swal.fire('Éxito', 'Médico registrado exitosamente', 'success')
      form.value = {
        registroMedico: '',
        nombres: '',
        apellidos: '',
        especialidad: '',
        telefono: ''
      }
      searchEspecialidad.value = ''
    } else {
      const errorData = await res.json()
      Swal.fire('Error', errorData.error || 'Ocurrió un error al registrar el médico', 'error')
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
      <div class="mb-3 position-relative">
        <label for="especialidad" class="form-label">Especialidad</label>
        <input 
          type="text" 
          id="especialidad" 
          class="form-control" 
          v-model="searchEspecialidad" 
          @focus="showDropdown = true" 
          @blur="hideDropdown"
          placeholder="Buscar especialidad..." 
          required
          autocomplete="off"
        >
        <ul class="dropdown-menu w-100 shadow-sm" :class="{ show: showDropdown }" style="position: absolute; z-index: 1000; max-height: 200px; overflow-y: auto;">
          <li v-for="esp in filteredEspecialidades" :key="esp.clave">
            <a class="dropdown-item" href="#" @mousedown.prevent="selectEspecialidad(esp)">
              {{ esp.valor }} ({{ esp.clave }})
            </a>
          </li>
          <li v-if="filteredEspecialidades.length === 0">
            <span class="dropdown-item text-muted">No se encontraron resultados</span>
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="telefono" class="form-label">Teléfono</label>
        <input type="tel" id="telefono" class="form-control" v-model="form.telefono" @input="form.telefono = form.telefono.replace(/\D/g, '')" placeholder="Ej: 3001234567" maxlength="10" required>
      </div>
      <button type="submit" class="btn btn-success">Registrar Médico</button>
    </form>
  </div>
</template>

<style scoped></style>