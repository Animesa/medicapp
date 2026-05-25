<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import ActionCard from "./ActionCard.vue";
import AppointmentCard from "./AppointmentCard.vue";
import dayjs from "dayjs";
import { API_BASE_URL } from '../config.js';

const router = useRouter();
const citas = ref([]);
const especialidades = ref([]);
const todayStr = dayjs().format('YYYY-MM-DD');

const loadData = async () => {
  try {
    const [citasRes, catalogosRes] = await Promise.all([
      fetch(`${API_BASE_URL}/citas?fecha=${todayStr}`),
      fetch(`${API_BASE_URL}/catalogos`)
    ]);

    if (citasRes.ok) {
      citas.value = await citasRes.json();
    }
    
    if (catalogosRes.ok) {
      const catalogos = await catalogosRes.json();
      const catDocs = catalogos.find(c => c.nombre.toUpperCase() === 'ESPECIALIDADES MÉDICOS' || c.nombre.toUpperCase() === 'ESPECIALIDADES MÉDICAS');
      if (catDocs && catDocs.valores) {
        especialidades.value = catDocs.valores;
      }
    }
  } catch (err) {
    console.error("Error cargando citas", err);
  }
};

const citasHoy = computed(() => {
  return [...citas.value].sort((a, b) => a.hora.localeCompare(b.hora));
});

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Bienvenido a MedicAPP</h1>
    <div class="row">
      <div class="col-md-3 mb-4">
        <ActionCard
          title="Registrar Paciente"
          description="Registra un nuevo paciente en el sistema."
          icon="bi bi-person-plus-fill"
          iconColor="#007bff"
          buttonText="Registrar"
          buttonClass="btn-primary"
          @action="router.push('/registrar-paciente')"
        />
      </div>
      <div class="col-md-3 mb-4">
        <ActionCard
          title="Registrar Medico"
          description="Registra un nuevo médico en la plataforma."
          icon="bi bi-heart-pulse"
          iconColor="#28a745"
          buttonText="Registrar"
          buttonClass="btn-success"
          @action="router.push('/registrar-medico')"
        />
      </div>
      <div class="col-md-3 mb-4">
        <ActionCard
          title="Agendar Cita"
          description="Programa una cita médica con facilidad."
          icon="bi bi-calendar-event"
          iconColor="#ffc107"
          buttonText="Agendar"
          buttonClass="btn-warning"
          @action="router.push('/agendar-cita')"
        />
      </div>
      <div class="col-md-3 mb-4">
        <ActionCard
          title="Administración"
          description="Gestiona los catálogos y configuraciones del sistema."
          icon="bi bi-gear-fill"
          iconColor="#17a2b8"
          buttonText="Administrar"
          buttonClass="btn-info text-white"
          @action="router.push('/administracion')"
        />
      </div>
    </div>

    <div class="mt-5">
      <h2 class="text-center mb-4">Citas Programadas para Hoy</h2>
      <div v-if="citasHoy.length > 0" class="row">
        <div v-for="cita in citasHoy" :key="cita.id" class="col-md-6 col-sm-12 mb-3">
          <AppointmentCard
            :appointment="cita"
            :especialidades="especialidades"
            @click="router.push(`/registrar-epicrisis/${cita.id}`)"
          />
        </div>
      </div>
      <div v-else class="text-center">
        <p>No hay citas programadas para hoy.</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
