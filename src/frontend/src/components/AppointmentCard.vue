<script setup>
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { defineProps, defineEmits, computed } from "vue";

dayjs.locale('es');

const props = defineProps({
    appointment: {
        type: Object,
        required: true
    },
    especialidades: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['click']);

const pacienteNombre = computed(() => props.appointment.paciente ? `${props.appointment.paciente.nombres} ${props.appointment.paciente.apellidos}` : 'Paciente Desconocido');
const pacienteEdad = computed(() => props.appointment.paciente?.fechaNacimiento ? dayjs().diff(dayjs(props.appointment.paciente.fechaNacimiento), 'year') : null);

const medicoNombre = computed(() => props.appointment.medico ? `${props.appointment.medico.nombres} ${props.appointment.medico.apellidos}` : 'Médico Desconocido');

const especialidadDisplay = computed(() => {
    const clave = props.appointment.medico?.especialidad;
    if (!clave) return "";
    const esp = props.especialidades.find(e => e.clave === clave);
    return esp ? `${clave} - ${esp.valor}` : clave;
});
</script>

<template>
  <div class="card border-dark appointment-card mb-3"
    style="cursor: pointer"
    @click="emit('click', appointment)"
  >
  <div class="card-header fs-5 fw-bold py-2 d-flex justify-content-between align-items-center">
    <span>{{ pacienteNombre }}</span>
    <span v-if="pacienteEdad !== null" class="badge bg-secondary fs-6">
      {{ pacienteEdad }} años
    </span>
  </div>
    <div class="card-body">
      <p class="card-text">
        <strong>Médico:</strong> {{ medicoNombre }} ({{ especialidadDisplay }})<br />
        <strong>Fecha:</strong> {{ dayjs(appointment.fecha).format('dddd, D [de] MMMM [de] YYYY').toUpperCase() }}<br />
        <strong>Hora:</strong> {{ dayjs(`2000-01-01T${appointment.hora}`).format('hh:mm A') }}
      </p>
    </div>
  </div>
</template>

<style scoped>

.appointment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
</style>