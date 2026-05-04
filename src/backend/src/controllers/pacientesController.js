import * as pacientesService from '../services/pacientesService.js'

export const list = async (req, res) => {
  try {
    const result = await pacientesService.list(req.query)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Error al obtener pacientes' })
  }
}

export const create = async (req, res) => {
  try {
    const paciente = await pacientesService.create(req.body)
    res.status(201).json(paciente)
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message || 'Error al crear paciente' })
  }
}

export const update = async (req, res) => {
  try {
    const paciente = await pacientesService.update(req.params.id, req.body)
    res.json(paciente)
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message || 'Error al actualizar paciente' })
  }
}

export const destroy = async (req, res) => {
  try {
    const result = await pacientesService.destroy(req.params.id)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Error al eliminar paciente' })
  }
}

export default { list, create, update, destroy }
