<script setup>
import ServiceCard from "./ServiceCard.vue";
import ContactFab from "./ContactFab.vue";
import { LOGIN_URL } from '../config.js';

const goToLogin = () => {
  window.location.href = LOGIN_URL;
};
</script>

<template>
  <div class="landing-page container">
    <div class="row align-items-center" style="min-height: 40vh;">
      <div class="col-md-6 text-center mb-4 mb-md-0">
        <img src="/images/logo_app.png" alt="MedicAPP" class="img-fluid" style="max-height: 280px; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.1));">
      </div>
      <div class="col-md-6 text-center text-md-start">
        <h1 class="display-5 fw-bolder mb-3" style="background: linear-gradient(135deg, #2c3e50, #3498db); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -1px;">
          Tu asistente<br>médico digital
        </h1>
        <p class="lead mb-3 text-muted" style="font-size: 1.1rem;">
          Gestiona pacientes, médicos, agendas y registros clínicos desde una plataforma única, moderna y eficiente.
        </p>
        <button @click="goToLogin" class="btn btn-primary rounded-pill px-4 py-2 shadow-sm" style="background: linear-gradient(135deg, #007bff, #0056b3); border: none; font-weight: 600; transition: transform 0.2s ease;">
          Comenzar Ahora <i class="bi bi-arrow-right ms-2"></i>
        </button>
      </div>
    </div>

    <!-- Sección de Servicios / Portafolio -->
    <div class="py-5 mt-2 mb-5">
      <div class="text-center mb-5">
        <h2 class="fw-bold" style="color: #2c3e50;">Todo lo que necesitas en un solo lugar</h2>
        <p class="text-muted" style="font-size: 1.1rem;">Descubre las herramientas diseñadas para optimizar la gestión de tu consultorio.</p>
      </div>
      
      <div class="row g-4">
        <!-- Servicio 1 -->
        <div class="col-md-3">
          <ServiceCard 
            title="Gestión de Pacientes"
            description="Mantén un registro detallado y organizado de todos tus pacientes de manera segura e instantánea."
            icon="bi-people-fill"
            iconColor="#007bff"
            iconBg="rgba(0, 123, 255, 0.1)"
          />
        </div>
        
        <!-- Servicio 2 -->
        <div class="col-md-3">
          <ServiceCard 
            title="Directorio Médico"
            description="Administra el personal médico, especialidades y horarios de atención con total facilidad."
            icon="bi-heart-pulse-fill"
            iconColor="#28a745"
            iconBg="rgba(40, 167, 69, 0.1)"
          />
        </div>

        <!-- Servicio 3 -->
        <div class="col-md-3">
          <ServiceCard 
            title="Agendamiento"
            description="Programa, modifica y controla citas médicas con un calendario rápido e intuitivo."
            icon="bi-calendar-event-fill"
            iconColor="#ffc107"
            iconBg="rgba(255, 193, 7, 0.1)"
          />
        </div>

        <!-- Servicio 4 -->
        <div class="col-md-3">
          <ServiceCard 
            title="Epicrisis y Reportes"
            description="Genera y consulta historiales clínicos y reportes de atención en tiempo real."
            icon="bi-file-earmark-medical-fill"
            iconColor="#17a2b8"
            iconBg="rgba(23, 162, 184, 0.1)"
          />
        </div>
      </div>
    </div>

    <!-- Botón Flotante de Contacto -->
    <ContactFab email="contacto@medicapp.com" />
  </div>
</template>

<style scoped></style>
