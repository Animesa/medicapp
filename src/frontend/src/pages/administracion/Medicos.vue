<script setup>
import { ref, onMounted } from "vue";
import BackButton from "../../components/BackButton.vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import Pagination from "../../components/Pagination.vue";

const router = useRouter();
import { API_BASE_URL } from '../../config.js';

const medicos = ref([]);
const especialidades = ref([]);
const page = ref(1);
const totalPages = ref(1);
const limit = 10;

let editModalInstance = null;

const form = ref({
  id: null,
  registroMedico: '',
  nombres: '',
  apellidos: '',
  especialidad: '',
  telefono: ''
});

const loadCatalogos = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/catalogos`);
    if (res.ok) {
      const catalogos = await res.json();
      const catDoc = catalogos.find(c => c.nombre.toUpperCase() === 'ESPECIALIDADES MÉDICOS' || c.nombre.toUpperCase() === 'ESPECIALIDADES MÉDICAS');
      if (catDoc && catDoc.valores) {
        especialidades.value = catDoc.valores;
      }
    }
  } catch (error) {
    console.error("Error cargando catálogos", error);
  }
};

const getEspecialidadDisplay = (clave) => {
  const especialidad = especialidades.value.find(e => e.clave === clave);
  return especialidad ? especialidad.valor : clave;
};

const loadMedicos = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/medicos?page=${page.value}&limit=${limit}`);
    if (res.ok) {
      const result = await res.json();
      medicos.value = result.data;
      totalPages.value = result.totalPages || 1;
    }
  } catch (error) {
    console.error("Error cargando médicos", error);
    Swal.fire('Error', 'No se pudieron cargar los médicos', 'error');
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    loadMedicos();
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    loadMedicos();
  }
};

const goToPage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p;
    loadMedicos();
  }
};

const openEditModal = (medico) => {
  form.value = { ...medico };
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
    const res = await fetch(`${API_BASE_URL}/medicos/${form.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    if (res.ok) {
      Swal.fire('Éxito', 'Médico actualizado correctamente', 'success');
      closeEditModal();
      loadMedicos();
    } else {
      const err = await res.json();
      Swal.fire('Error', err.error || 'Error al actualizar', 'error');
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Error de conexión', 'error');
  }
};

const deleteMedico = async (id) => {
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
      const res = await fetch(`${API_BASE_URL}/medicos/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        Swal.fire('Eliminado!', 'El médico ha sido eliminado.', 'success');
        loadMedicos();
      } else {
        Swal.fire('Error', 'No se pudo eliminar el médico', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error de conexión', 'error');
    }
  }
};

onMounted(async () => {
  await loadCatalogos();
  await loadMedicos();
  const modalElement = document.getElementById('editModal');
  if (modalElement) {
    editModalInstance = new Modal(modalElement);
  }
});
</script>

<template>
  <div class="container mt-5 mb-5">
    <BackButton @back="router.push('/administracion')" />
    <h1 class="mb-4">Administrar Médicos</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-dark">
              <tr>
                <th>Reg. Médico</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Especialidad</th>
                <th>Teléfono</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="medico in medicos" :key="medico.id">
                <td>{{ medico.registroMedico }}</td>
                <td>{{ medico.nombres }}</td>
                <td>{{ medico.apellidos }}</td>
                <td>{{ getEspecialidadDisplay(medico.especialidad) }}</td>
                <td>{{ medico.telefono }}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-primary me-2" @click="openEditModal(medico)" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteMedico(medico.id)" title="Eliminar">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="medicos.length === 0">
                <td colspan="6" class="text-center py-4">No hay médicos registrados.</td>
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-white bg-primary">
            <h5 class="modal-title" id="editModalLabel">Editar Médico</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeEditModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEdit">
              <div class="mb-3">
                <label class="form-label">Registro Médico</label>
                <input type="text" class="form-control" v-model="form.registroMedico" @input="form.registroMedico = form.registroMedico.replace(/\D/g, '')" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Nombres</label>
                <input type="text" class="form-control" v-model="form.nombres" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Apellidos</label>
                <input type="text" class="form-control" v-model="form.apellidos" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Especialidad</label>
                <select class="form-select" v-model="form.especialidad" required>
                  <option value="">Seleccione...</option>
                  <option v-for="esp in especialidades" :key="esp.clave" :value="esp.clave">
                    {{ esp.clave }} - {{ esp.valor }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input type="tel" class="form-control" v-model="form.telefono" @input="form.telefono = form.telefono.replace(/\D/g, '')" maxlength="10" required>
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