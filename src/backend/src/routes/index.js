import { Router } from 'express'
import pacientesRouter from './pacientes.js'
import medicosRouter from './medicos.js'
import citasRouter from './citas.js'
import epicrisisRouter from './epicrisis.js'
import catalogosRouter from './catalogos.js'

const router = Router()

router.use('/pacientes', pacientesRouter)
router.use('/medicos', medicosRouter)
router.use('/citas', citasRouter)
router.use('/epicrisis', epicrisisRouter)
router.use('/catalogos', catalogosRouter)

export default router
