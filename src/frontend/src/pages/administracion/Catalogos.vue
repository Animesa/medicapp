<script setup>
import { ref, reactive, onMounted } from "vue";
import BackButton from "../../components/BackButton.vue";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

const router = useRouter();
import { API_BASE_URL } from '../../config.js';

const catalogos = ref([]);
const selectedCatalogo = ref(null);

const loadCatalogos = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/catalogos`);
    if (res.ok) {
      catalogos.value = await res.json();
      if (selectedCatalogo.value) {
        selectedCatalogo.value = catalogos.value.find(c => c.id === selectedCatalogo.value.id) || null;
      }
    }
  } catch (err) {
    console.error("Error cargando catálogos", err);
  }
};

onMounted(() => {
  loadCatalogos();
});

// Forms state
const showFormCatalogo = ref(false);
const formCatalogo = reactive({ id: null, nombre: "", descripcion: "", activo: true });

const showFormDetalle = ref(false);
const formDetalle = reactive({ id: null, clave: "", valor: "", activo: true });

const selectCatalogo = (cat) => {
  selectedCatalogo.value = cat;
  showFormDetalle.value = false;
};

// Acciones Catálogos
const abrirNuevoCatalogo = () => {
  formCatalogo.id = null;
  formCatalogo.nombre = "";
  formCatalogo.descripcion = "";
  formCatalogo.activo = true;
  showFormCatalogo.value = true;
};

const editarCatalogo = (cat) => {
  formCatalogo.id = cat.id;
  formCatalogo.nombre = cat.nombre;
  formCatalogo.descripcion = cat.descripcion;
  formCatalogo.activo = cat.activo !== undefined ? cat.activo : true;
  showFormCatalogo.value = true;
};

const guardarCatalogo = async () => {
  if (!formCatalogo.nombre) return;
  try {
    if (formCatalogo.id) {
      await fetch(`${API_BASE_URL}/catalogos/${formCatalogo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formCatalogo.nombre,
          descripcion: formCatalogo.descripcion,
          activo: formCatalogo.activo
        })
      });
      Swal.fire('Éxito', 'Catálogo actualizado correctamente', 'success');
    } else {
      await fetch(`${API_BASE_URL}/catalogos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formCatalogo.nombre,
          descripcion: formCatalogo.descripcion,
          activo: formCatalogo.activo
        })
      });
      Swal.fire('Éxito', 'Catálogo creado correctamente', 'success');
    }
    showFormCatalogo.value = false;
    await loadCatalogos();
  } catch (err) {
    console.error("Error guardando catálogo", err);
    Swal.fire('Error', 'Ocurrió un error al guardar el catálogo', 'error');
  }
};

// Acciones Detalles
const abrirNuevoDetalle = () => {
  formDetalle.id = null;
  formDetalle.clave = "";
  formDetalle.valor = "";
  formDetalle.activo = true;
  showFormDetalle.value = true;
};

const editarDetalle = (val) => {
  formDetalle.id = val.id;
  formDetalle.clave = val.clave;
  formDetalle.valor = val.valor;
  formDetalle.activo = val.activo !== undefined ? val.activo : true;
  showFormDetalle.value = true;
};

const eliminarDetalle = async (id) => {
  const result = await Swal.fire({
    title: '¿Está seguro?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      await fetch(`${API_BASE_URL}/catalogos/valores/${id}`, {
        method: "DELETE"
      });
      await loadCatalogos();
      Swal.fire('Eliminado', 'El valor ha sido eliminado', 'success');
    } catch (err) {
      console.error("Error eliminando detalle", err);
      Swal.fire('Error', 'Ocurrió un error al eliminar el valor', 'error');
    }
  }
};

const guardarDetalle = async () => {
  if (!formDetalle.clave || !formDetalle.valor || !selectedCatalogo.value) return;
  const catId = selectedCatalogo.value.id;
  
  try {
    if (formDetalle.id) {
      await fetch(`${API_BASE_URL}/catalogos/valores/${formDetalle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clave: formDetalle.clave,
          valor: formDetalle.valor,
          activo: formDetalle.activo
        })
      });
      Swal.fire('Éxito', 'Valor actualizado correctamente', 'success');
    } else {
      await fetch(`${API_BASE_URL}/catalogos/${catId}/valores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clave: formDetalle.clave,
          valor: formDetalle.valor,
          activo: formDetalle.activo
        })
      });
      Swal.fire('Éxito', 'Valor creado correctamente', 'success');
    }
    showFormDetalle.value = false;
    await loadCatalogos();
  } catch (err) {
    console.error("Error guardando detalle", err);
    Swal.fire('Error', 'Ocurrió un error al guardar el valor', 'error');
  }
};
</script>

<template>
  <div class="container mt-5">
    <BackButton @back="router.push('/administracion')" />
    <h1 class="mb-4">Administrar Catálogos</h1>

    <div class="row">
      <!-- Columna Izquierda: Lista de Catálogos -->
      <div class="col-md-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Catálogos</h4>
          <button class="btn btn-sm btn-success" @click="abrirNuevoCatalogo">
            <i class="bi bi-plus-lg"></i> Nuevo
          </button>
        </div>

        <div v-if="showFormCatalogo" class="card mb-3 shadow-sm border-success">
          <div class="card-body">
            <h6 class="card-title text-success">{{ formCatalogo.id ? 'Editar' : 'Nuevo' }} Catálogo</h6>
            <input v-model="formCatalogo.nombre" class="form-control form-control-sm mb-2" placeholder="Nombre" />
            <input v-model="formCatalogo.descripcion" class="form-control form-control-sm mb-2" placeholder="Descripción" />
            <div class="form-check form-switch mb-2">
              <input class="form-check-input" type="checkbox" role="switch" v-model="formCatalogo.activo" id="catActivoSwitch">
              <label class="form-check-label" for="catActivoSwitch">Activo</label>
            </div>
            <button class="btn btn-sm btn-success me-2" @click="guardarCatalogo">Guardar</button>
            <button class="btn btn-sm btn-outline-secondary" @click="showFormCatalogo = false">Cancelar</button>
          </div>
        </div>

        <ul class="list-group shadow-sm">
          <li 
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
            v-for="cat in catalogos" :key="cat.id"
            :class="{ active: selectedCatalogo?.id === cat.id }"
            @click="selectCatalogo(cat)"
            style="cursor: pointer;"
          >
            <div>
              <span class="fw-bold">{{ cat.nombre }}</span>
              <span v-if="!cat.activo" class="badge bg-secondary ms-2" style="font-size: 0.65em;">Inactivo</span>
              <div style="font-size: 0.8rem; opacity: 0.8;">{{ cat.descripcion }}</div>
            </div>
            <div class="d-flex align-items-center">
              <button class="btn btn-sm btn-link text-decoration-none p-0 me-2" @click.stop="editarCatalogo(cat)" :class="{ 'text-white': selectedCatalogo?.id === cat.id, 'text-secondary': selectedCatalogo?.id !== cat.id }">
                <i class="bi bi-pencil"></i>
              </button>
              <i class="bi bi-chevron-right" v-if="selectedCatalogo?.id === cat.id"></i>
            </div>
          </li>
          <li v-if="catalogos.length === 0" class="list-group-item text-muted">
            No hay catálogos registrados.
          </li>
        </ul>
      </div>

      <!-- Columna Derecha: Detalles del Catálogo -->
      <div class="col-md-8">
        <div v-if="selectedCatalogo" class="card shadow-sm">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0 text-primary">{{ selectedCatalogo.nombre }}</h5>
            <button class="btn btn-sm btn-primary" @click="abrirNuevoDetalle">
              <i class="bi bi-plus-lg"></i> Agregar Valor
            </button>
          </div>
          <div class="card-body">
            
            <div v-if="showFormDetalle" class="card mb-3 border-primary bg-light">
              <div class="card-body">
                <h6 class="card-title text-primary">{{ formDetalle.id ? 'Editar' : 'Nuevo' }} Valor</h6>
                <div class="row">
                  <div class="col-md-4">
                    <input v-model="formDetalle.clave" class="form-control form-control-sm mb-2" placeholder="Clave" />
                  </div>
                  <div class="col-md-5">
                    <input v-model="formDetalle.valor" class="form-control form-control-sm mb-2" placeholder="Valor" />
                  </div>
                  <div class="col-md-3 d-flex align-items-center mb-2">
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" role="switch" v-model="formDetalle.activo" id="activoSwitch">
                      <label class="form-check-label" for="activoSwitch">Activo</label>
                    </div>
                  </div>
                </div>
                <button class="btn btn-sm btn-primary me-2" @click="guardarDetalle">Guardar</button>
                <button class="btn btn-sm btn-outline-secondary" @click="showFormDetalle = false">Cancelar</button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Clave</th>
                    <th>Valor</th>
                    <th class="text-center">Estado</th>
                    <th class="text-center" style="width: 120px;">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="val in (selectedCatalogo.valores || [])" :key="val.id">
                    <td class="fw-semibold">{{ val.clave }}</td>
                    <td class="text-muted">{{ val.valor }}</td>
                    <td class="text-center">
                      <span v-if="val.activo" class="badge bg-success">Activo</span>
                      <span v-else class="badge bg-secondary">Inactivo</span>
                    </td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-primary me-1" title="Editar" @click.stop="editarDetalle(val)">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger" title="Eliminar" @click.stop="eliminarDetalle(val.id)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="!selectedCatalogo.valores || selectedCatalogo.valores.length === 0">
                    <td colspan="3" class="text-center text-muted py-4">
                      <i class="bi bi-info-circle mb-2 d-block" style="font-size: 1.5rem;"></i>
                      No hay valores registrados para este catálogo.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="h-100 d-flex flex-column justify-content-center align-items-center text-muted" style="min-height: 300px; background-color: #f8f9fa; border-radius: 0.5rem; border: 1px dashed #dee2e6;">
          <i class="bi bi-list-check" style="font-size: 3rem;"></i>
          <h5 class="mt-3">Seleccione un catálogo</h5>
          <p>Haga clic en un catálogo de la lista para ver y gestionar sus valores.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.list-group-item.active .text-muted,
.list-group-item.active div[style*="opacity"] {
  color: #e9ecef !important;
  opacity: 1 !important;
}
</style>