import { Router } from 'express'
import citasController from '../controllers/citasController.js'

const router = Router()

/**
 * @openapi
 * /api/citas:
 *   get:
 *     tags:
 *       - Citas
 *     summary: Obtener todas las citas
 *     responses:
 *       200:
 *         description: Lista de citas
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
 *       - Citas
 *     summary: Agendar una nueva cita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medicoId:
 *                 type: integer
 *               pacienteId:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *               motivo:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cita agendada exitosamente
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
 * /api/citas/{id}:
 *   get:
 *     tags:
 *       - Citas
 *     summary: Obtener una cita por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la cita
 *       404:
 *         description: Cita no encontrada
 *       400:
 *         description: Error en la petición (datos inválidos)
 *       401:
 *         description: No autorizado (token faltante o inválido)
 *       403:
 *         description: Prohibido (no tiene permisos)
 *       500:
 *         description: Error interno del servidor
 *   put:
 *     tags:
 *       - Citas
 *     summary: Actualizar una cita existente
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
 *               medicoId:
 *                 type: integer
 *               pacienteId:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *               motivo:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cita actualizada exitosamente
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
 *       - Citas
 *     summary: Eliminar una cita
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita eliminada exitosamente
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
router.get('/', citasController.list)
router.get('/:id', citasController.getById)
router.post('/', citasController.create)
router.put('/:id', citasController.update)
router.delete('/:id', citasController.destroy)

export default router
