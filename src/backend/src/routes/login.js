import { Router } from 'express'
import usuariosController from '../controllers/usuariosController.js'

const router = Router()


router.get('/', usuariosController.login)
router.post('/', usuariosController.authenticate)

// Rutas de recuperación de contraseña
router.get('/forgot-password', usuariosController.forgotPasswordForm)
router.post('/forgot-password', usuariosController.sendResetLink)
router.get('/reset-password', usuariosController.resetPasswordForm)
router.post('/reset-password', usuariosController.updatePassword)

export default router
