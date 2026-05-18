import * as usuariosService from '../services/usuariosService.js'

export const login = async (req, res) => {
    res.render('login')
}

export const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await usuariosService.authenticate(email, password)

        if (!token) {
            return res.render('login', { error: 'Credenciales inválidas. Intenta nuevamente.' })
        }

        return res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    } catch (error) {
        return res.render('login', { error: error.message || 'Credenciales inválidas. Intenta nuevamente.' })
    }
}

export const list = async (req, res) => {
    try {
        const result = await usuariosService.list(req.query)
        res.json(result)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Error al obtener usuarios' });
    }
}

export const create = async (req, res) => {
    try {
        const usuario = await usuariosService.create(req.body)
        res.status(201).json(usuario)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Error al crear el usuario' });
    }
}

export const update = async (req, res) => {
    try {
        const usuario = await usuariosService.update(req.params.id, req.body)
        res.json(usuario)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Error al actualizar el usuario' });
    }
}

export const destroy = async (req, res) => {
    try {
        const result = await usuariosService.destroy(req.params.id)
        res.json(result)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Error al eliminar el usuario' });
    }
}

export default { login, authenticate, list, create, update, destroy }