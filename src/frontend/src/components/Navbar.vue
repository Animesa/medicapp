<script setup>
import { useRouter } from 'vue-router';
import { LOGIN_URL } from '../config.js';
import { isAuthenticated, clearToken } from '../utils/auth.js';

const router = useRouter();

const login = () => {
  window.location.href = LOGIN_URL;
};

const logout = () => {
  clearToken();
  if (router.currentRoute.value.path !== '/') {
    router.push('/');
  }
};

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <nav class="navbar navbar-expand-lg medicapp-navbar fixed-top shadow-sm">
    <div class="container-fluid align-items-center justify-content-between">
      
      <!-- Lado Izquierdo: Logo y Nombre -->
      <div class="d-flex align-items-center text-decoration-none navbar-brand-container" style="cursor: pointer;" @click="goHome">
        <img src="/images/logo_app.png" alt="MedicAPP Logo" class="nav-logo-img">
        <span class="app-name ms-2">MedicAPP</span>
      </div>

      <!-- Lado Derecho: Botón de Ingreso -->
      <div class="d-flex align-items-center">
        <button v-if="!isAuthenticated" @click="login" class="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2 login-btn">
          <i class="bi bi-box-arrow-in-right"></i> Ingresar
        </button>
        <button v-else @click="logout" class="btn btn-outline-danger rounded-pill px-4 d-flex align-items-center gap-2 logout-btn">
          <i class="bi bi-box-arrow-right"></i> Salir
        </button>
      </div>
      
    </div>
  </nav>
</template>

<style scoped>
.medicapp-navbar {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  z-index: 1030;
  transition: all 0.3s ease;
}

.login-btn {
  background: linear-gradient(135deg, #007bff, #0056b3);
  border: none;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
}

.logout-btn {
  font-weight: 600;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #dc3545;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 53, 69, 0.3);
}

.navbar-brand-container {
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.navbar-brand-container:hover {
  transform: scale(1.02);
}

.app-name {
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.nav-logo-img {
  height: 55px;
  width: auto;
  object-fit: contain;
}
</style>
