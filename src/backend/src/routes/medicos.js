import { Router } from 'express'
import medicosController from '../controllers/medicosController.js'

const router = Router()

/**
 * @openapi
 * /api/medicos:
 *   get:
 *     tags:
 *       - Medicos
 *     summary: Obtener todos los médicos
 *     responses:
 *       200:
 *         description: Lista de médicos
 *   post:
 *     tags:
 *       - Medicos
 *     summary: Registrar un nuevo médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registroMedico:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Médico registrado exitosamente
 *
 * /api/medicos/{id}:
 *   put:
 *     tags:
 *       - Medicos
 *     summary: Actualizar un médico existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registroMedico:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Médico actualizado exitosamente
 *   delete:
 *     tags:
 *       - Medicos
 *     summary: Eliminar un médico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico eliminado exitosamente
 */
router.get('/', medicosController.list)
router.post('/', medicosController.create)
router.put('/:id', medicosController.update)
router.delete('/:id', medicosController.destroy)

export default router
