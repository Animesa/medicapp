import * as medicosService from '../services/medicosService.js'

export const list = async (req, res) => {
  try {
    const result = await medicosService.list(req.query)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Error al obtener médicos' })
  }
}

export const create = async (req, res) => {
  try {
    const medico = await medicosService.create(req.body)
    res.status(201).json(medico)
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message || 'Error al crear médico' })
  }
}

export const update = async (req, res) => {
  try {
    const medico = await medicosService.update(req.params.id, req.body)
    res.json(medico)
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message || 'Error al actualizar médico' })
  }
}

export const destroy = async (req, res) => {
  try {
    const result = await medicosService.destroy(req.params.id)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Error al eliminar médico' })
  }
}

export default { list, create, update, destroy }
