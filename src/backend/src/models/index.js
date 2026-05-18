import sequelize from '../database/connection.js'
import Paciente from './Paciente.js'
import Medico from './Medico.js'
import Cita from './Cita.js'
import Epicrisis from './Epicrisis.js'
import Catalogos from './Catalogos.js'
import CatalogoValores from './CatalogoValores.js'
import Usuarios from './Usuarios.js'

// Creación de relaciones entre las tablas.
Paciente.hasMany(Cita, { foreignKey: 'pacienteId' })
Cita.belongsTo(Paciente, { as: 'paciente', foreignKey: 'pacienteId' })

Medico.hasMany(Cita, { foreignKey: 'medicoId' })
Cita.belongsTo(Medico, { as: 'medico', foreignKey: 'medicoId' })

Cita.hasOne(Epicrisis, { foreignKey: 'citaId' })
Epicrisis.belongsTo(Cita, { as: 'cita', foreignKey: 'citaId' })

Catalogos.hasMany(CatalogoValores, { as: 'valores', foreignKey: 'id_catalogo' })
CatalogoValores.belongsTo(Catalogos, { foreignKey: 'id_catalogo' })

export {
  sequelize,
  Paciente,
  Medico,
  Cita,
  Epicrisis,
  Catalogos,
  CatalogoValores,
  Usuarios
}
