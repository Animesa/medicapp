import { DataTypes } from 'sequelize'
import sequelize from '../database/connection.js'

const Medico = sequelize.define('Medico', {
  registroMedico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Medico
