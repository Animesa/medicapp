import { DataTypes } from 'sequelize'
import sequelize from '../database/connection.js'

const CatalogoValores = sequelize.define('CatalogoValores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_catalogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Catalogos',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['id_catalogo', 'clave']
        }
    ]
})

export default CatalogoValores