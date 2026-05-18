import { Usuarios } from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const list = async (query) => {
    const { page, limit } = query

    if (page && limit) {
        const { count, rows } = await Usuarios.findAndCountAll({
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit)
        });

        return {
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            data: rows
        }
    }

    return await Usuarios.findAll()
}

export const findByUsuario = async (usuario) => {
    return await Usuarios.findOne({ where: { user_id: usuario } })
}

export const authenticate = async (email, password) => {
    const usuario = await Usuarios.findOne({ where: { email } })
    if (!usuario) {
        const error = new Error('Credenciales inválidas')
        error.status = 401
        throw error
    }

    const isMatch = await bcrypt.compare(password, usuario.password)
    if (!isMatch) {
        const error = new Error('Credenciales inválidas')
        error.status = 401
        throw error
    }

    if (!usuario.activo) {
        const error = new Error('El usuario está inactivo')
        error.status = 403
        throw error
    }

    const token = jwt.sign(
        {
            user_id: usuario.user_id,
            email: usuario.email,
            user_name: usuario.user_name,
            user_lastname: usuario.user_lastname,
            rolId: usuario.rolId
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return token
}

export const create = async (data) => {
    return await Usuarios.create(data)
}

export const update = async (user_id, data) => {
    const usuario = await Usuarios.findByPk(user_id)
    if (!usuario) {
        const error = new Error('Usuario no encontrado')
        error.status = 404
        throw error
    }
    return await usuario.update(data)
}

export const destroy = async (user_id) => {
    const usuario = await Usuarios.findByPk(user_id)
    if (!usuario) {
        const error = new Error('Usuario no encontrado')
        error.status = 404
        throw error
    }
    await usuario.destroy()
    return { message: 'Usuario eliminado exitosamente' }
}