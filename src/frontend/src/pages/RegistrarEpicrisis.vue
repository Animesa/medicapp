<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
import { API_BASE_URL } from '../config.js'

const citaId = route.params.id
const citaData = ref(null)
const especialidades = ref([])

const form = ref({
  diagnostico: '',
  tratamiento: '',
  medicamentos: '',
  recomendaciones: '',
  notas: ''
})

const getEspecialidadDisplay = (clave) => {
  if (!clave) return "";
  const esp = especialidades.value.find(e => e.clave === clave);
  if (esp) {
    return `${clave} - ${esp.valor}`;
  }
  return clave;
}

const loadData = async () => {
  try {
    const [citaRes, catalogosRes] = await Promise.all([
      fetch(`${API_BASE_URL}/citas/${citaId}`),
      fetch(`${API_BASE_URL}/catalogos`)
    ]);

    if (citaRes.ok) {
      citaData.value = await citaRes.json();
    } else {
      Swal.fire('Error', 'No se pudo cargar la información de la cita', 'error');
      router.push('/');
      return;
    }

    if (catalogosRes.ok) {
      const catalogos = await catalogosRes.json();
      const catDocs = catalogos.find(c => c.nombre.toUpperCase() === 'ESPECIALIDADES MÉDICOS' || c.nombre.toUpperCase() === 'ESPECIALIDADES MÉDICAS');
      if (catDocs && catDocs.valores) {
        especialidades.value = catDocs.valores;
      }
    }
  } catch (error) {
    console.error("Error cargando datos", error);
    Swal.fire('Error', 'Error de conexión', 'error');
  }
}

onMounted(() => {
  loadData()
})

const citaInfo = computed(() => {
  if (!citaData.value) return null;
  const c = citaData.value;
  return {
    paciente: c.paciente ? `${c.paciente.nombres} ${c.paciente.apellidos}` : 'Desconocido',
    medico: c.medico ? `${c.medico.nombres} ${c.medico.apellidos}` : 'Desconocido',
    especialidad: c.medico ? getEspecialidadDisplay(c.medico.especialidad) : '',
    fecha: dayjs(c.fecha).format('DD/MM/YYYY'),
    hora: c.hora,
    motivo: c.motivo
  }
})

const submitForm = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/epicrisis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        citaId: citaId
      })
    })

    if (res.ok) {
      Swal.fire('Éxito', 'Epicrisis registrada exitosamente!', 'success')
      router.push('/')
    } else {
      const errorData = await res.json()
      Swal.fire('Error', errorData.error || 'Ocurrió un error al registrar la epicrisis', 'error')
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
    <h1>Registrar Epicrisis</h1>
    <div v-if="citaInfo" class="card mb-4">
      <div class="card-body">
        <h4 class="card-title">{{ citaInfo.paciente }}</h4>
        <p class="card-text">
          <strong>Médico:</strong> {{ citaInfo.medico }} ({{ citaInfo.especialidad }})<br>
          <strong>Fecha:</strong> {{ citaInfo.fecha }}<br>
          <strong>Hora:</strong> {{ citaInfo.hora }}
        </p>
      </div>
    </div>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="mb-3" v-if="citaInfo && citaInfo.motivo">
        <label class="form-label">Motivo de Consulta</label>
        <textarea class="form-control" :value="citaInfo.motivo" rows="2" readonly disabled></textarea>
      </div>
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