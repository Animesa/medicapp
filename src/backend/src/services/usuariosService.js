import { Usuarios } from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { Op } from 'sequelize'

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

export const generateResetToken = async (email) => {
    const usuario = await Usuarios.findOne({ where: { email } })
    if (!usuario) {
        const error = new Error('No existe ningún usuario registrado con este correo electrónico.')
        error.status = 404
        throw error
    }

    const token = crypto.randomBytes(20).toString('hex')
    const expires = Date.now() + 3600000 // 1 hora en milisegundos

    await usuario.update({
        resetPasswordToken: token,
        resetPasswordExpires: expires
    })

    return token
}

export const sendRecoveryEmail = async (email, token, host) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
        port: parseInt(process.env.SMTP_PORT || '2525'),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    const resetUrl = `http://${host}/login/reset-password?token=${token}`

    const mailOptions = {
        from: '"MedicAPP Support" <soporte@medicapp.com>',
        to: email,
        subject: 'Recuperación de Contraseña - MedicAPP',
        html: `
        <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2c3e50; font-size: 28px; margin: 0; font-weight: 700;">MedicAPP</h1>
            <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0 0 0;">Tu asistente médico digital</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
          <h2 style="color: #2c3e50; font-size: 20px; margin-top: 0;">Restablecer tu contraseña</h2>
          <p style="color: #555555; font-size: 16px; line-height: 1.6;">
            Has solicitado restablecer la contraseña para tu cuenta de MedicAPP. Para completar este proceso, por favor haz clic en el siguiente botón:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 30px; font-weight: 600; border-radius: 50px; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);">
              Restablecer Contraseña
            </a>
          </div>
          <p style="color: #7f8c8d; font-size: 14px; line-height: 1.6;">
            Este enlace es de un solo uso y expirará en 1 hora. Si tú no solicitaste este restablecimiento, puedes ignorar este correo con total seguridad; tu contraseña actual no sufrirá ningún cambio.
          </p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
          <p style="color: #bdc3c7; font-size: 12px; text-align: center; margin: 0;">
            Este es un correo automático, por favor no respondas a este mensaje.
          </p>
        </div>
        `
    }

    await transporter.sendMail(mailOptions)
}

export const validateResetToken = async (token) => {
    const usuario = await Usuarios.findOne({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: {
                [Op.gt]: Date.now()
            }
        }
    })

    if (!usuario) {
        const error = new Error('El token de recuperación no existe o ha expirado.')
        error.status = 400
        throw error
    }

    return usuario
}

export const updatePassword = async (token, newPassword) => {
    const usuario = await validateResetToken(token)

    await usuario.update({
        password: newPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
    })
}