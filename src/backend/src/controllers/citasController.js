import * as citasService from '../services/citasService.js'

export const list = async (req, res) => {
  try {
    const result = await citasService.list(req.query)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Error al obtener citas' })
  }
}

export const create = async (req, res) => {
  try {
    const cita = await citasService.create(req.body)
    res.status(201).json(cita)
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message || 'Error al agendar cita' })
  }
}

export const getById = async (req, res) => {
  try {
    const cita = await citasService.getById(req.params.id)
    res.json(cita)
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Error al obtener la cita' })
  }
}

export const update = async (req, res) => {
  try {
    const cita = await citasService.update(req.params.id, req.body)
    res.json(cita)
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message || 'Error al actualizar cita' })
  }
}

export const destroy = async (req, res) => {
  try {
    const result = await citasService.destroy(req.params.id)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Error al eliminar cita' })
  }
}

export default { list, create, getById, update, destroy }
