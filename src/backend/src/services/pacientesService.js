import { Paciente } from '../models/index.js'

export const list = async (query) => {
  const { page, limit } = query;
  
  if (page && limit) {
    const { count, rows } = await Paciente.findAndCountAll({
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });
    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows
    };
  }

  return await Paciente.findAll()
}

export const create = async (data) => {
  return await Paciente.create(data)
}

export const update = async (id, data) => {
  const paciente = await Paciente.findByPk(id)
  if (!paciente) {
    const error = new Error('Paciente no encontrado')
    error.status = 404
    throw error
  }
  return await paciente.update(data)
}

export const destroy = async (id) => {
  const paciente = await Paciente.findByPk(id)
  if (!paciente) {
    const error = new Error('Paciente no encontrado')
    error.status = 404
    throw error
  }
  await paciente.destroy()
  return { message: 'Paciente eliminado exitosamente' }
}
