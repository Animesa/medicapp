import * as catalogosService from '../services/catalogosService.js'

export const getCatalogos = async (req, res) => {
    try {
        const catalogos = await catalogosService.getCatalogos()
        res.json(catalogos)
    } catch (error) {
        console.error('Error al obtener los catálogos:', error)
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' })
    }
}

export const getCatalogoByNombre = async (req, res) => {
    const { nombre } = req.params
    try {
        const catalogo = await catalogosService.getCatalogoByNombre(nombre)
        if (!catalogo) {
            return res.status(404).json({ message: 'Catálogo no encontrado' })
        }
        res.json(catalogo)
    } catch (error) {
        console.error('Error al obtener el catálogo por nombre:', error)
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' })
    }
}

export const createCatalogo = async (req, res) => {
    try {
        const nuevoCatalogo = await catalogosService.createCatalogo(req.body)
        res.status(201).json(nuevoCatalogo)
    } catch (error) {
        console.error('Error al crear catálogo:', error)
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' })
    }
}

export const updateCatalogo = async (req, res) => {
    const { id } = req.params
    try {
        const catalogo = await catalogosService.updateCatalogo(id, req.body)
        res.json(catalogo)
    } catch (error) {
        console.error('Error al actualizar catálogo:', error)
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' })
    }
}

export const createCatalogoValor = async (req, res) => {
    const { id } = req.params
    try {
        const nuevoValor = await catalogosService.createCatalogoValor(id, req.body)
        res.status(201).json(nuevoValor)
    } catch (error) {
        console.error('Error al crear valor de catálogo:', error)
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' })
    }
}

export const updateCatalogoValor = async (req, res) => {
    const { valorId } = req.params
    try {
        const catalogoValor = await catalogosService.updateCatalogoValor(valorId, req.body)
        res.json(catalogoValor)
    } catch (error) {
        console.error('Error al actualizar valor de catálogo:', error)
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' })
    }
}

export const deleteCatalogoValor = async (req, res) => {
    const { valorId } = req.params
    try {
        const result = await catalogosService.deleteCatalogoValor(valorId)
        res.json(result)
    } catch (error) {
        console.error('Error al eliminar valor de catálogo:', error)
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' })
    }
}
