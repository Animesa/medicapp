import { createRouter, createWebHistory } from 'vue-router'
import { LOGIN_URL } from '../config.js'
import Home from '../pages/Home.vue'
import RegistrarPaciente from '../pages/RegistrarPaciente.vue'
import RegistrarMedico from '../pages/RegistrarMedico.vue'
import AgendarCita from '../pages/AgendarCita.vue'
import RegistrarEpicrisis from '../pages/RegistrarEpicrisis.vue'
import Administracion from '../pages/administracion/Administracion.vue'
import Catalogos from '../pages/administracion/Catalogos.vue'
import Medicos from '../pages/administracion/Medicos.vue'
import Pacientes from '../pages/administracion/Pacientes.vue'
import Citas from '../pages/administracion/Citas.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/registrar-paciente',
        name: 'RegistrarPaciente',
        component: RegistrarPaciente
    },
    {
        path: '/registrar-medico',
        name: 'RegistrarMedico',
        component: RegistrarMedico
    },
    {
        path: '/agendar-cita',
        name: 'AgendarCita',
        component: AgendarCita
    },
    {
        path: '/registrar-epicrisis/:id',
        name: 'RegistrarEpicrisis',
        component: RegistrarEpicrisis
    },
    {
        path: '/administracion',
        name: 'Administracion',
        component: Administracion
    },
    {
        path: '/administracion/catalogos',
        name: 'Catalogos',
        component: Catalogos
    },
    {
        path: '/administracion/medicos',
        name: 'Medicos',
        component: Medicos
    },
    {
        path: '/administracion/pacientes',
        name: 'Pacientes',
        component: Pacientes
    },
    {
        path: '/administracion/citas',
        name: 'Citas',
        component: Citas
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('auth_token');

    if (to.path === '/') {
        next();
        return;
    }

    if (!token && !to.query.token) {
        window.location.href = LOGIN_URL;
    } else {
        next();
    }
});

export default router