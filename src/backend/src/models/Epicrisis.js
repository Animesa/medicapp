import { DataTypes } from 'sequelize'
import sequelize from '../database/connection.js'

const Epicrisis = sequelize.define('Epicrisis', {
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tratamiento: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  medicamentos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  recomendaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
})

export default Epicrisis
