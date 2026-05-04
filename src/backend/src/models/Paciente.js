import { DataTypes } from 'sequelize'
import sequelize from '../database/connection.js'

const Paciente = sequelize.define('Paciente', {
  tipoDocumento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numeroDocumento: {
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
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Paciente
