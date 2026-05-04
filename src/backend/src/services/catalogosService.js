import { Catalogos, CatalogoValores } from '../models/index.js'

export const getCatalogos = async () => {
    return await Catalogos.findAll({
        include: [{
            model: CatalogoValores,
            as: 'valores',
            attributes: { exclude: ['id_catalogo'] }
        }],
        order: [
            ['nombre', 'ASC'],
            [{ model: CatalogoValores, as: 'valores' }, 'valor', 'ASC']
        ]
    })
}

export const getCatalogoByNombre = async (nombre) => {
    return await Catalogos.findOne({
        where: { nombre },
        include: [{
            model: CatalogoValores,
            as: 'valores',
            attributes: { exclude: ['id_catalogo'] }
        }],
        order: [
            [{ model: CatalogoValores, as: 'valores' }, 'valor', 'ASC']
        ]
    })
}

export const createCatalogo = async (data) => {
    const { nombre, descripcion, activo } = data
    const existe = await Catalogos.findOne({ where: { nombre } })
    if (existe) {
        const error = new Error('El catálogo ya existe')
        error.status = 409
        throw error
    }
    return await Catalogos.create({ nombre, descripcion, activo })
}

export const updateCatalogo = async (id, data) => {
    const { nombre, descripcion, activo } = data
    const catalogo = await Catalogos.findByPk(id)
    if (!catalogo) {
        const error = new Error('Catálogo no encontrado')
        error.status = 404
        throw error
    }
    return await catalogo.update({ nombre, descripcion, activo })
}

export const createCatalogoValor = async (id, data) => {
    const { clave, valor, activo } = data
    const catalogo = await Catalogos.findByPk(id)
    if (!catalogo) {
        const error = new Error('Catálogo no encontrado')
        error.status = 404
        throw error
    }

    const existe = await CatalogoValores.findOne({ where: { id_catalogo: id, clave } })
    if (existe) {
        const error = new Error('El código ya existe en este catálogo')
        error.status = 409
        throw error
    }

    return await CatalogoValores.create({
        id_catalogo: id,
        clave,
        valor,
        activo
    })
}

export const updateCatalogoValor = async (valorId, data) => {
    const { clave, valor, activo } = data
    const catalogoValor = await CatalogoValores.findByPk(valorId)
    if (!catalogoValor) {
        const error = new Error('Valor de catálogo no encontrado')
        error.status = 404
        throw error
    }
    return await catalogoValor.update({ clave, valor, activo })
}

export const deleteCatalogoValor = async (valorId) => {
    const catalogoValor = await CatalogoValores.findByPk(valorId)
    if (!catalogoValor) {
        const error = new Error('Valor de catálogo no encontrado')
        error.status = 404
        throw error
    }
    await catalogoValor.destroy()
    return { message: 'Valor eliminado correctamente' }
}
