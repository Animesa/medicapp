import { DataTypes } from 'sequelize'
import sequelize from '../database/connection.js'

const Cita = sequelize.define('Cita', {
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: false
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pendiente'
  },
  medicoId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
})

export default Cita
