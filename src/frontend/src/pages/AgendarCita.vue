<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import BackButton from "../components/BackButton.vue";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const router = useRouter();
import { API_BASE_URL } from '../config.js';

const minDate = dayjs().format('YYYY-MM-DD');

const medicos = ref([]);
const especialidades = ref([]);

const form = ref({
  medicoId: "",
  fecha: "",
  hora: "",
  motivo: "",
  pacienteId: "" 
});

const searchMedico = ref("");
const showDropdown = ref(false);

const pacientes = ref([]);
const searchPaciente = ref("");
const showDropdownPaciente = ref(false);

const loadData = async () => {
  try {
    const [medicosRes, pacientesRes, catalogosRes] = await Promise.all([
      fetch(`${API_BASE_URL}/medicos`),
      fetch(`${API_BASE_URL}/pacientes`),
      fetch(`${API_BASE_URL}/catalogos`)
    ]);

    if (medicosRes.ok) {
      medicos.value = await medicosRes.json();
    }
    
    if (pacientesRes.ok) {
      pacientes.value = await pacientesRes.json();
    }
    
    if (catalogosRes.ok) {
      const catalogos = await catalogosRes.json();
      const catDocs = catalogos.find(c => c.nombre.toUpperCase() === 'ESPECIALIDADES MÉDICOS' || c.nombre.toUpperCase() === 'ESPECIALIDADES MÉDICAS');
      if (catDocs && catDocs.valores) {
        especialidades.value = catDocs.valores;
      }
    }
  } catch (err) {
    console.error("Error cargando datos", err);
  }
};

const getEspecialidadDisplay = (clave) => {
  if (!clave) return "";
  const esp = especialidades.value.find(e => e.clave === clave);
  if (esp) {
    return `${clave} - ${esp.valor}`;
  }
  return clave;
};

const filteredMedicos = computed(() => {
  if (!searchMedico.value) return medicos.value;
  const s = searchMedico.value.toLowerCase();
  return medicos.value.filter(m => {
    const especialidadDisplay = getEspecialidadDisplay(m.especialidad).toLowerCase();
    return `${m.nombres} ${m.apellidos}`.toLowerCase().includes(s) || 
           especialidadDisplay.includes(s);
  });
});

const selectMedico = (medico) => {
  form.value.medicoId = medico.id;
  searchMedico.value = `${medico.nombres} ${medico.apellidos}`;
  showDropdown.value = false;
};

const hideDropdown = () => {
  setTimeout(() => { showDropdown.value = false }, 200);
};

const filteredPacientes = computed(() => {
  if (!searchPaciente.value) return pacientes.value;
  const s = searchPaciente.value.toLowerCase();
  return pacientes.value.filter(p => {
    return `${p.nombres} ${p.apellidos}`.toLowerCase().includes(s) || 
           (p.numeroDocumento && p.numeroDocumento.includes(s));
  });
});

const selectPaciente = (paciente) => {
  form.value.pacienteId = paciente.id;
  searchPaciente.value = `${paciente.nombres} ${paciente.apellidos} - ${paciente.numeroDocumento}`;
  showDropdownPaciente.value = false;
};

const hideDropdownPaciente = () => {
  setTimeout(() => { showDropdownPaciente.value = false }, 200);
};

const selectedMedico = computed(() => {
  return medicos.value.find((m) => m.id === form.value.medicoId);
});

const especialidad = computed(() => {
  return selectedMedico.value ? getEspecialidadDisplay(selectedMedico.value.especialidad) : "";
});

onMounted(() => {
  loadData();
});

const submitForm = async () => {
  const match = medicos.value.find(m => 
    `${m.nombres} ${m.apellidos}`.toLowerCase() === searchMedico.value.toLowerCase()
  );
  if (match) {
    form.value.medicoId = match.id;
  }

  const matchPaciente = pacientes.value.find(p => 
    `${p.nombres} ${p.apellidos} - ${p.numeroDocumento}`.toLowerCase() === searchPaciente.value.toLowerCase() ||
    `${p.nombres} ${p.apellidos}`.toLowerCase() === searchPaciente.value.toLowerCase()
  );
  if (matchPaciente) {
    form.value.pacienteId = matchPaciente.id;
  }

  if (!form.value.pacienteId) {
    Swal.fire("Atención", "Por favor busque y seleccione un paciente de la lista.", "warning");
    return;
  }

  if (!form.value.medicoId) {
    Swal.fire("Atención", "Por favor busque y seleccione un médico de la lista.", "warning");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/citas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha: form.value.fecha,
        hora: form.value.hora,
        motivo: form.value.motivo,
        medicoId: form.value.medicoId,
        pacienteId: form.value.pacienteId
      })
    });
    
    if (res.ok) {
      Swal.fire("Éxito", "Cita agendada exitosamente!", "success");
      form.value = {
        medicoId: "",
        fecha: "",
        hora: "",
        motivo: "",
        pacienteId: ""
      };
      searchMedico.value = "";
      searchPaciente.value = "";
    } else {
      const errorData = await res.json();
      Swal.fire("Error", errorData.error || "Ocurrió un error al agendar la cita", "error");
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Ocurrió un error de conexión", "error");
  }
};
</script>

<template>
  <div class="container mt-5">
    <BackButton @back="router.push('/')" />
    <h1>Agendar Cita</h1>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="mb-3 position-relative">
        <label for="paciente" class="form-label">Seleccionar Paciente</label>
        <input 
          type="text" 
          id="paciente" 
          class="form-control" 
          v-model="searchPaciente" 
          @focus="showDropdownPaciente = true" 
          @blur="hideDropdownPaciente"
          placeholder="Buscar paciente por nombre o documento..." 
          required
          autocomplete="off"
        >
        <ul class="dropdown-menu w-100 shadow-sm" :class="{ show: showDropdownPaciente }" style="position: absolute; z-index: 1000; max-height: 200px; overflow-y: auto;">
          <li v-for="paciente in filteredPacientes" :key="paciente.id">
            <a class="dropdown-item" href="#" @mousedown.prevent="selectPaciente(paciente)">
              <div class="fw-bold">{{ paciente.nombres }} {{ paciente.apellidos }}</div>
              <small class="text-muted">{{ paciente.tipoDocumento }} - {{ paciente.numeroDocumento }}</small>
            </a>
          </li>
          <li v-if="filteredPacientes.length === 0">
            <span class="dropdown-item text-muted">No se encontraron pacientes</span>
          </li>
        </ul>
      </div>
      <div class="mb-3 position-relative">
        <label for="medico" class="form-label">Seleccionar Médico</label>
        <input 
          type="text" 
          id="medico" 
          class="form-control" 
          v-model="searchMedico" 
          @focus="showDropdown = true" 
          @blur="hideDropdown"
          placeholder="Buscar médico por nombre o especialidad..." 
          required
          autocomplete="off"
        >
        <ul class="dropdown-menu w-100 shadow-sm" :class="{ show: showDropdown }" style="position: absolute; z-index: 1000; max-height: 200px; overflow-y: auto;">
          <li v-for="medico in filteredMedicos" :key="medico.id">
            <a class="dropdown-item" href="#" @mousedown.prevent="selectMedico(medico)">
              <div class="fw-bold">{{ medico.nombres }} {{ medico.apellidos }}</div>
              <small class="text-muted">{{ getEspecialidadDisplay(medico.especialidad) }}</small>
            </a>
          </li>
          <li v-if="filteredMedicos.length === 0">
            <span class="dropdown-item text-muted">No se encontraron médicos</span>
          </li>
        </ul>
      </div>
      <div class="mb-3" v-if="especialidad">
        <label class="form-label">Especialidad</label>
        <input
          type="text"
          class="form-control"
          :value="especialidad"
          disabled
          readonly
        />
      </div>
      <div class="mb-3">
        <label for="fecha" class="form-label">Fecha de la Cita</label>
        <input
          type="date"
          id="fecha"
          class="form-control"
          v-model="form.fecha"
          :min="minDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="hora" class="form-label">Hora de la Cita</label>
        <input
          type="time"
          id="hora"
          class="form-control"
          v-model="form.hora"
          required
        />
      </div>
      <div class="mb-3">
        <label for="motivo" class="form-label">Motivo de la Consulta</label>
        <textarea
          id="motivo"
          class="form-control"
          v-model="form.motivo"
          rows="3"
          placeholder="Describa brevemente el motivo de la consulta"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-warning">Agendar Cita</button>
    </form>
  </div>
</template>

<style scoped></style>