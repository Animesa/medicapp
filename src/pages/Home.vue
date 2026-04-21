<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const today = new Date()

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

const citasHoy = computed(() => {
  return citas.value.filter(cita => {
    return cita.fecha.toDateString() === today.toDateString()
  })
})
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Bienvenido a MedicAPP</h1>
    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center" style="min-height: 350px;">
          <div class="card-body d-flex flex-column justify-content-center">
            <i class="bi bi-person-plus-fill" style="font-size: 4rem; color: #007bff;"></i>
            <h5 class="card-title mt-4">Registrar Usuario</h5>
            <p class="card-text">Crea una nueva cuenta de usuario para acceder al sistema.</p>
            <button class="btn btn-primary mt-auto" @click="router.push('/registrar-usuario')">Registrar</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center" style="min-height: 350px;">
          <div class="card-body d-flex flex-column justify-content-center">
            <i class="bi bi-heart-pulse" style="font-size: 4rem; color: #28a745;"></i>
            <h5 class="card-title mt-4">Registrar Medico</h5>
            <p class="card-text">Registra un nuevo médico en la plataforma.</p>
            <button class="btn btn-success mt-auto" @click="router.push('/registrar-medico')">Registrar</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center" style="min-height: 350px;">
          <div class="card-body d-flex flex-column justify-content-center">
            <i class="bi bi-calendar-event" style="font-size: 4rem; color: #ffc107;"></i>
            <h5 class="card-title mt-4">Agendar Cita</h5>
            <p class="card-text">Programa una cita médica con facilidad.</p>
            <button class="btn btn-warning mt-auto" @click="router.push('/agendar-cita')">Agendar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <h2 class="text-center mb-4">Citas Programadas para Hoy</h2>
      <div v-if="citasHoy.length > 0" class="row">
        <div v-for="cita in citasHoy" :key="cita.id" class="col-md-6 mb-3">
          <div class="card appointment-card" style="cursor: pointer;" @click="router.push(`/registrar-epicrisis/${cita.id}`)">
            <div class="card-body">
              <h5 class="card-title">{{ cita.paciente }}</h5>
              <p class="card-text">
                <strong>Médico:</strong> {{ cita.medico }} ({{ cita.especialidad }})<br>
                <strong>Hora:</strong> {{ cita.hora }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p>No hay citas programadas para hoy.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appointment-card {
  background-color: #e3f2fd; /* Light blue background */
  border: 1px solid #bbdefb;
}

.appointment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
</style>