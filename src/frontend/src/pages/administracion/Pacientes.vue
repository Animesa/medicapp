<script setup>
import { ref, onMounted } from "vue";
import BackButton from "../../components/BackButton.vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import Pagination from "../../components/Pagination.vue";

const router = useRouter();
import { API_BASE_URL } from '../../config.js';

const pacientes = ref([]);
const tiposDocumento = ref([]);
const page = ref(1);
const totalPages = ref(1);
const limit = 10;

let editModalInstance = null;

const form = ref({
  id: null,
  tipoDocumento: '',
  numeroDocumento: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  correo: '',
  telefono: ''
});

const loadCatalogos = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/catalogos`);
    if (res.ok) {
      const catalogos = await res.json();
      const catDoc = catalogos.find(c => c.nombre.toUpperCase() === 'TIPOS DE DOCUMENTOS');
      if (catDoc && catDoc.valores) {
        tiposDocumento.value = catDoc.valores;
      }
    }
  } catch (error) {
    console.error("Error cargando catálogos", error);
  }
};

const getTipoDocumentoDisplay = (clave) => {
  const tipo = tiposDocumento.value.find(t => t.clave === clave);
  return tipo ? tipo.valor : clave;
};

const loadPacientes = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/pacientes?page=${page.value}&limit=${limit}`);
    if (res.ok) {
      const result = await res.json();
      pacientes.value = result.data;
      totalPages.value = result.totalPages || 1;
    }
  } catch (error) {
    console.error("Error cargando pacientes", error);
    Swal.fire('Error', 'No se pudieron cargar los pacientes', 'error');
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    loadPacientes();
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    loadPacientes();
  }
};

const goToPage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p;
    loadPacientes();
  }
};

const openEditModal = (paciente) => {
  form.value = { ...paciente };
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
    const res = await fetch(`${API_BASE_URL}/pacientes/${form.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    if (res.ok) {
      Swal.fire('Éxito', 'Paciente actualizado correctamente', 'success');
      closeEditModal();
      loadPacientes();
    } else {
      const err = await res.json();
      Swal.fire('Error', err.error || 'Error al actualizar', 'error');
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Error de conexión', 'error');
  }
};

const deletePaciente = async (id) => {
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
      const res = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        Swal.fire('Eliminado!', 'El paciente ha sido eliminado.', 'success');
        loadPacientes();
      } else {
        Swal.fire('Error', 'No se pudo eliminar el paciente', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error de conexión', 'error');
    }
  }
};

onMounted(async () => {
  await loadCatalogos();
  await loadPacientes();
  const modalElement = document.getElementById('editModal');
  if (modalElement) {
    editModalInstance = new Modal(modalElement);
  }
});
</script>

<template>
  <div class="container mt-5 mb-5">
    <BackButton @back="router.push('/administracion')" />
    <h1 class="mb-4">Administrar Pacientes</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-dark">
              <tr>
                <th>Tipo Doc.</th>
                <th>Número</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="paciente in pacientes" :key="paciente.id">
                <td>{{ getTipoDocumentoDisplay(paciente.tipoDocumento) }}</td>
                <td>{{ paciente.numeroDocumento }}</td>
                <td>{{ paciente.nombres }}</td>
                <td>{{ paciente.apellidos }}</td>
                <td>{{ paciente.correo }}</td>
                <td>{{ paciente.telefono }}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-primary me-2" @click="openEditModal(paciente)" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deletePaciente(paciente.id)" title="Eliminar">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="pacientes.length === 0">
                <td colspan="7" class="text-center py-4">No hay pacientes registrados.</td>
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
            <h5 class="modal-title" id="editModalLabel">Editar Paciente</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeEditModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEdit">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Tipo de Documento</label>
                  <select class="form-select" v-model="form.tipoDocumento" required>
                    <option value="">Seleccione...</option>
                    <option v-for="tipo in tiposDocumento" :key="tipo.clave" :value="tipo.clave">
                      {{ tipo.clave }} - {{ tipo.valor }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Número de Documento</label>
                  <input type="text" class="form-control" v-model="form.numeroDocumento" @input="form.numeroDocumento = form.numeroDocumento.replace(/\D/g, '')" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Nombres</label>
                  <input type="text" class="form-control" v-model="form.nombres" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Apellidos</label>
                  <input type="text" class="form-control" v-model="form.apellidos" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Fecha de Nacimiento</label>
                  <input type="date" class="form-control" v-model="form.fechaNacimiento" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Correo</label>
                  <input type="email" class="form-control" v-model="form.correo" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Teléfono</label>
                  <input type="tel" class="form-control" v-model="form.telefono" @input="form.telefono = form.telefono.replace(/\D/g, '')" maxlength="10" required>
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