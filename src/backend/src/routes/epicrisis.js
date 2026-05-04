import { Router } from 'express'
import epicrisisController from '../controllers/epicrisisController.js'

const router = Router()

/**
 * @openapi
 * /api/epicrisis:
 *   get:
 *     tags:
 *       - Epicrisis
 *     summary: Obtener todos los registros de epicrisis
 *     responses:
 *       200:
 *         description: Lista de epicrisis
 *   post:
 *     tags:
 *       - Epicrisis
 *     summary: Registrar una nueva epicrisis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               citaId:
 *                 type: integer
 *               diagnostico:
 *                 type: string
 *               tratamiento:
 *                 type: string
 *               medicamentos:
 *                 type: string
 *               recomendaciones:
 *                 type: string
 *               notas:
 *                 type: string
 *     responses:
 *       201:
 *         description: Epicrisis registrada exitosamente
 */
router.get('/', epicrisisController.list)
router.post('/', epicrisisController.create)

export default router
