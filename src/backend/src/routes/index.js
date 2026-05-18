import { Router } from 'express'
import pacientesRouter from './pacientes.js'
import medicosRouter from './medicos.js'
import citasRouter from './citas.js'
import epicrisisRouter from './epicrisis.js'
import catalogosRouter from './catalogos.js'
import usuariosRouter from './usuarios.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = Router()

// Aplicar el middleware de autenticación a todas las rutas de la API
router.use(verifyToken)

router.use('/pacientes', pacientesRouter)
router.use('/medicos', medicosRouter)
router.use('/citas', citasRouter)
router.use('/epicrisis', epicrisisRouter)
router.use('/catalogos', catalogosRouter)
router.use('/usuarios', usuariosRouter)

export default router
