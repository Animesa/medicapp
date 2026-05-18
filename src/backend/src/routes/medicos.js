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
 *       400:
 *         description: Error en la petición (datos inválidos)
 *       401:
 *         description: No autorizado (token faltante o inválido)
 *       403:
 *         description: Prohibido (no tiene permisos)
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno del servidor
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
 *       400:
 *         description: Error en la petición (datos inválidos)
 *       401:
 *         description: No autorizado (token faltante o inválido)
 *       403:
 *         description: Prohibido (no tiene permisos)
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno del servidor
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
 *       400:
 *         description: Error en la petición (datos inválidos)
 *       401:
 *         description: No autorizado (token faltante o inválido)
 *       403:
 *         description: Prohibido (no tiene permisos)
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno del servidor
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
 *       400:
 *         description: Error en la petición (datos inválidos)
 *       401:
 *         description: No autorizado (token faltante o inválido)
 *       403:
 *         description: Prohibido (no tiene permisos)
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', medicosController.list)
router.post('/', medicosController.create)
router.put('/:id', medicosController.update)
router.delete('/:id', medicosController.destroy)

export default router
