import { Router } from 'express'
import pacientesController from '../controllers/pacientesController.js'

const router = Router()

/**
 * @openapi
 * /api/pacientes:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Obtener todos los pacientes
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Registrar un nuevo paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoDocumento:
 *                 type: string
 *               numeroDocumento:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente registrado exitosamente
 *
 * /api/pacientes/{id}:
 *   put:
 *     tags:
 *       - Pacientes
 *     summary: Actualizar un paciente existente
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
 *               tipoDocumento:
 *                 type: string
 *               numeroDocumento:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente actualizado exitosamente
 *   delete:
 *     tags:
 *       - Pacientes
 *     summary: Eliminar un paciente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente eliminado exitosamente
 */
router.get('/', pacientesController.list)
router.post('/', pacientesController.create)
router.put('/:id', pacientesController.update)
router.delete('/:id', pacientesController.destroy)

export default router
