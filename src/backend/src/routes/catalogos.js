import { Router } from 'express'
import {
    getCatalogos,
    getCatalogoByNombre,
    createCatalogo,
    updateCatalogo,
    createCatalogoValor,
    updateCatalogoValor,
    deleteCatalogoValor
} from '../controllers/catalogosController.js'

const router = Router()

/**
 * @openapi
 * /api/catalogos:
 *   get:
 *     tags:
 *       - Catalogos
 *     summary: Obtener todos los catálogos
 *     responses:
 *       200:
 *         description: Lista de catálogos
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

/**
 * @openapi
 * /api/catalogos:
 *   post:
 *     tags:
 *       - Catalogos
 *     summary: Crear un nuevo catálogo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               activo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Catálogo creado exitosamente
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

/**
 * @openapi
 * /api/catalogos/{id}:
 *   put:
 *     tags:
 *       - Catalogos
 *     summary: Actualizar un catálogo
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
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Catálogo actualizado exitosamente
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

/**
 * @openapi
 * /api/catalogos/{id}/valores:
 *   post:
 *     tags:
 *       - Catalogos
 *     summary: Crear un nuevo valor para un catálogo
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
 *               clave:
 *                 type: string
 *               valor:
 *                 type: string
 *               activo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Valor creado exitosamente
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

/**
 * @openapi
 * /api/catalogos/valores/{valorId}:
 *   put:
 *     tags:
 *       - Catalogos
 *     summary: Actualizar un valor de un catálogo
 *     parameters:
 *       - name: valorId
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
 *               clave:
 *                 type: string
 *               valor:
 *                 type: string
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Valor actualizado exitosamente
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
 * /api/catalogos/nombre/{nombre}:
 *   get:
 *     tags:
 *       - Catalogos
 *     summary: Obtener un catálogo y sus valores por nombre
 *     parameters:
 *       - name: nombre
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del catálogo
 *       404:
 *         description: Catálogo no encontrado
 *       400:
 *         description: Error en la petición (datos inválidos)
 *       401:
 *         description: No autorizado (token faltante o inválido)
 *       403:
 *         description: Prohibido (no tiene permisos)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /api/catalogos/valores/{valorId}:
 *   delete:
 *     tags:
 *       - Catalogos
 *     summary: Eliminar un valor de un catálogo
 *     parameters:
 *       - name: valorId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Valor eliminado exitosamente
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

// Rutas para Catálogos
router.get('/', getCatalogos)
router.get('/nombre/:nombre', getCatalogoByNombre)
router.post('/', createCatalogo)
router.put('/:id', updateCatalogo)

// Rutas para Valores de un Catálogo
router.post('/:id/valores', createCatalogoValor)
router.put('/valores/:valorId', updateCatalogoValor)
router.delete('/valores/:valorId', deleteCatalogoValor)

export default router
