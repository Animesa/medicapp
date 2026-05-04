<script setup>
import { ref, onMounted } from "vue";
import BackButton from "../../components/BackButton.vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import Pagination from "../../components/Pagination.vue";
import dayjs from "dayjs";
import { API_BASE_URL } from "../../config.js";

const router = useRouter();

const citas = ref([]);
const medicos = ref([]);
const pacientes = ref([]);
const estados = ref([]);
const page = ref(1);
const totalPages = ref(1);
const limit = 10;

let editModalInstance = null;

const form = ref({
  id: null,
  fecha: '',
  hora: '',
  motivo: '',
  estado: '',
  medicoId: '',
  pacienteId: ''
});

const loadCatalogos = async () => {
  try {
    const [resMedicos, resPacientes, resEstados] = await Promise.all([
      fetch(`${API_BASE_URL}/medicos`),
      fetch(`${API_BASE_URL}/pacientes`),
      fetch(`${API_BASE_URL}/catalogos/nombre/ESTADOS CITAS`)
    ]);
    if (resMedicos.ok) {
      const data = await resMedicos.json();
      medicos.value = data.data || data;
    }
    if (resPacientes.ok) {
      const data = await resPacientes.json();
      pacientes.value = data.data || data;
    }
    if (resEstados.ok) {
      const data = await resEstados.json();
      estados.value = data.valores || [];
    }
  } catch (error) {
    console.error("Error cargando médicos, pacientes o estados", error);
  }
};

const loadCitas = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/citas?page=${page.value}&limit=${limit}`);
    if (res.ok) {
      const result = await res.json();
      citas.value = result.data;
      totalPages.value = result.totalPages || 1;
    }
  } catch (error) {
    console.error("Error cargando citas", error);
    Swal.fire('Error', 'No se pudieron cargar las citas', 'error');
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    loadCitas();
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    loadCitas();
  }
};

const goToPage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p;
    loadCitas();
  }
};

const openEditModal = (cita) => {
  form.value = { 
    id: cita.id,
    fecha: cita.fecha,
    hora: cita.hora,
    motivo: cita.motivo,
    estado: cita.estado || 'Pendiente',
    medicoId: cita.medicoId,
    pacienteId: cita.pacienteId
  };
  if (editModalInstance) {
    editModalInstance.show();
  }
};

const closeEditModal = () => {
  if (editModalInstance) {
    editModalInstance.hide();
  }
};

const submitEdit = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/citas/${form.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    if (res.ok) {
      Swal.fire('Éxito', 'Cita actualizada correctamente', 'success');
      closeEditModal();
      loadCitas();
    } else {
      const err = await res.json();
      Swal.fire('Error', err.error || 'Error al actualizar', 'error');
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Error de conexión', 'error');
  }
};

const deleteCita = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`${API_BASE_URL}/citas/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        Swal.fire('Eliminado!', 'La cita ha sido eliminada.', 'success');
        loadCitas();
      } else {
        Swal.fire('Error', 'No se pudo eliminar la cita', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error de conexión', 'error');
    }
  }
};

onMounted(async () => {
  await loadCatalogos();
  await loadCitas();
  const modalElement = document.getElementById('editModal');
  if (modalElement) {
    editModalInstance = new Modal(modalElement);
  }
});

const formatTime = (time) => dayjs(`2000-01-01T${time}`).format('hh:mm A');
</script>

<template>
  <div class="container mt-5 mb-5">
    <BackButton @back="router.push('/administracion')" />
    <h1 class="mb-4">Administración de Citas</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-dark">
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Motivo</th>
                <th>Estado</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cita in citas" :key="cita.id">
                <td>{{ dayjs(cita.fecha).format('YYYY-MM-DD') }}</td>
                <td>{{ formatTime(cita.hora) }}</td>
                <td>{{ cita.paciente ? `${cita.paciente.nombres} ${cita.paciente.apellidos}` : 'N/A' }}</td>
                <td>{{ cita.medico ? `${cita.medico.nombres} ${cita.medico.apellidos}` : 'N/A' }}</td>
                <td>{{ cita.motivo }}</td>
                <td>
                  <span v-if="cita.estado === 'Completada'" class="badge bg-success">{{ cita.estado }}</span>
                  <span v-else-if="cita.estado === 'Cancelada'" class="badge bg-danger">{{ cita.estado }}</span>
                  <span v-else class="badge bg-warning text-dark">{{ cita.estado || 'Pendiente' }}</span>
                </td>
                <td class="text-center">
                  <button class="btn btn-sm btn-primary me-2" @click="openEditModal(cita)" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteCita(cita.id)" title="Eliminar">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="citas.length === 0">
                <td colspan="7" class="text-center py-4">No hay citas registradas.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <Pagination 
          :currentPage="page" 
          :totalPages="totalPages" 
          @prev="prevPage" 
          @next="nextPage"
          @goto="goToPage"
        />
      </div>
    </div>

    <!-- Modal de Edición -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header text-white bg-primary">
            <h5 class="modal-title" id="editModalLabel">Editar Cita</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeEditModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEdit">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Paciente</label>
                  <select class="form-select" v-model="form.pacienteId" required disabled>
                    <option value="">Seleccione un paciente...</option>
                    <option v-for="p in pacientes" :key="p.id" :value="p.id">
                      {{ p.nombres }} {{ p.apellidos }} ({{ p.numeroDocumento }})
                    </option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Médico</label>
                  <select class="form-select" v-model="form.medicoId" required disabled>
                    <option value="">Seleccione un médico...</option>
                    <option v-for="m in medicos" :key="m.id" :value="m.id">
                      {{ m.nombres }} {{ m.apellidos }} - {{ m.especialidad }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Fecha</label>
                  <input type="date" class="form-control" v-model="form.fecha" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Hora</label>
                  <input type="time" class="form-control" v-model="form.hora" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Estado</label>
                  <select class="form-select" v-model="form.estado" required>
                    <option value="">Seleccione un estado...</option>
                    <option v-for="e in estados" :key="e.clave" :value="e.valor">
                      {{ e.valor }}
                    </option>
                  </select>
                </div>
                <div class="col-md-12 mb-3">
                  <label class="form-label">Motivo</label>
                  <textarea class="form-control" v-model="form.motivo" rows="3" required></textarea>
                </div>
              </div>
              <div class="modal-footer px-0 pb-0 mt-3 border-0">
                <button type="button" class="btn btn-secondary" @click="closeEditModal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>