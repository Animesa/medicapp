import { Router } from 'express'
import * as usuariosController from '../controllers/usuariosController.js'

const router = Router()

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               user_lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 *       400:
 *         description: Error en la petición (datos inválidos)
 *       401:
 *         description: No autorizado (token faltante o inválido)
 *       403:
 *         description: Prohibido (no tiene permisos)
 */
router.put('/:id', usuariosController.update)

export default router
