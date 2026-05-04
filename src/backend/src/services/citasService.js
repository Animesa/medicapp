import { Cita, Paciente, Medico, Epicrisis } from '../models/index.js'

export const list = async (query) => {
  const { fecha, page, limit } = query;
  
  const where = {};
  if (fecha) {
    where.fecha = fecha;
  }

  const queryOptions = {
    where,
    include: [
      { model: Medico, as: 'medico' },
      { model: Paciente, as: 'paciente' },
      { model: Epicrisis }
    ],
    order: [['fecha', 'ASC'], ['hora', 'ASC']]
  };

  if (page && limit) {
    queryOptions.limit = parseInt(limit);
    queryOptions.offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await Cita.findAndCountAll(queryOptions);
    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows
    };
  }

  return await Cita.findAll(queryOptions);
}

export const create = async (data) => {
  return await Cita.create(data)
}

export const getById = async (id) => {
  const cita = await Cita.findByPk(id, {
    include: [
      { model: Medico, as: 'medico' },
      { model: Paciente, as: 'paciente' },
      { model: Epicrisis }
    ]
  });
  if (!cita) {
    const error = new Error('Cita no encontrada')
    error.status = 404
    throw error
  }
  return cita;
}

export const update = async (id, data) => {
  const cita = await Cita.findByPk(id)
  if (!cita) {
    const error = new Error('Cita no encontrada')
    error.status = 404
    throw error
  }
  return await cita.update(data)
}

export const destroy = async (id) => {
  const cita = await Cita.findByPk(id)
  if (!cita) {
    const error = new Error('Cita no encontrada')
    error.status = 404
    throw error
  }
  await cita.destroy()
  return { message: 'Cita eliminada exitosamente' }
}
