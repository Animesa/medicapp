import { Router } from 'express'
import usuariosController from '../controllers/usuariosController.js'

const router = Router()


router.get('/', usuariosController.login)
router.post('/', usuariosController.authenticate)

export default router
