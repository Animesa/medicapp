import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import bcrypt from 'bcrypt';

const Usuarios = sequelize.define('Usuarios', {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.password) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        }
    }
})

export default Usuarios