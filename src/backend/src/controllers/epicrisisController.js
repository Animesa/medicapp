import * as epicrisisService from '../services/epicrisisService.js'

export const list = async (req, res) => {
  try {
    const epicrisisList = await epicrisisService.list()
    res.json(epicrisisList)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener epicrisis', details: error.message })
  }
}

export const create = async (req, res) => {
  try {
    const epicrisis = await epicrisisService.create(req.body)
    res.status(201).json(epicrisis)
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar epicrisis', details: error.message })
  }
}

export default { list, create }
