<script setup>
import ActionCard from "../../components/ActionCard.vue";
import { useRouter } from "vue-router";
import BackButton from "../../components/BackButton.vue";

const router = useRouter();
</script>

<template>
  <div class="container mt-5">
    <BackButton @back="router.push('/')" />
    <h1>Administración</h1>
    <div class="row">
      <div class="col-md-3 mb-4">
        <ActionCard
          title="Catalogos"
          description="Administrar catalogos del sistema"
          icon="bi bi-check2-square"
          iconColor="#6c757d"
          buttonText="Ir"
          buttonClass="btn-secondary"
          minHeight="200px"
          @action="router.push('/administracion/catalogos')"
        />
      </div>
      <div class="col-md-3 mb-4">
        <ActionCard
          title="Médicos"
          description="Administrar médicos"
          icon="bi bi-person-video3"
          iconColor="#6c757d"
          buttonText="Ir"
          buttonClass="btn-secondary"
          minHeight="200px"
          @action="router.push('/administracion/medicos')"
        />
      </div>
      <div class="col-md-3 mb-4">
        <ActionCard
          title="Pacientes"
          description="Administrar pacientes"
          icon="bi bi-people"
          iconColor="#6c757d"
          buttonText="Ir"
          buttonClass="btn-secondary"
          minHeight="200px"
          @action="router.push('/administracion/pacientes')"
        />
      </div>
      <div class="col-md-3 mb-4">
        <ActionCard
          title="Citas"
          description="Administrar citas"
          icon="bi bi-calendar"
          iconColor="#6c757d"
          buttonText="Ir"
          buttonClass="btn-secondary"
          minHeight="200px"
          @action="router.push('/administracion/citas')"
        />
      </div>  
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>