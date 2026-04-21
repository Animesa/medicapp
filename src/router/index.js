import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import RegistrarUsuario from '../pages/RegistrarUsuario.vue'
import RegistrarMedico from '../pages/RegistrarMedico.vue'
import AgendarCita from '../pages/AgendarCita.vue'
import RegistrarEpicrisis from '../pages/RegistrarEpicrisis.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/registrar-usuario',
        name: 'RegistrarUsuario',
        component: RegistrarUsuario
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router