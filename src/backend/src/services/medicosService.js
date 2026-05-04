import { Medico } from '../models/index.js'

export const list = async (query) => {
  const { page, limit } = query;
  
  if (page && limit) {
    const { count, rows } = await Medico.findAndCountAll({
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

  return await Medico.findAll()
}

export const create = async (data) => {
  return await Medico.create(data)
}

export const update = async (id, data) => {
  const medico = await Medico.findByPk(id)
  if (!medico) {
    const error = new Error('Médico no encontrado')
    error.status = 404
    throw error
  }
  return await medico.update(data)
}

export const destroy = async (id) => {
  const medico = await Medico.findByPk(id)
  if (!medico) {
    const error = new Error('Médico no encontrado')
    error.status = 404
    throw error
  }
  await medico.destroy()
  return { message: 'Médico eliminado exitosamente' }
}
