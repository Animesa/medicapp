import { Epicrisis, Cita, Medico, Paciente } from '../models/index.js'

export const list = async () => {
  return await Epicrisis.findAll({
    include: [
      {
        model: Cita,
        as: 'cita',
        include: [
          { model: Medico, as: 'medico' },
          { model: Paciente, as: 'paciente' }
        ]
      }
    ]
  })
}

export const create = async (data) => {
  const epicrisis = await Epicrisis.create(data)
  
  // Update associated Cita state to "Cancelada" as requested by user
  if (data.citaId) {
    const cita = await Cita.findByPk(data.citaId)
    if (cita) {
      await cita.update({ estado: 'Cancelada' })
    }
  }
  
  return epicrisis
}
