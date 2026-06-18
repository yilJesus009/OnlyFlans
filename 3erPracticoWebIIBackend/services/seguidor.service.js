const { Usuario, Favorito, Donacion, Post, PerfilCreador } = require('../models');
const { Op } = require('sequelize');

// ── Búsqueda de Creadores ────────────────────────────────────────────────

const buscarCreadores = async (query) => {
    const creadores = await Usuario.findAll({
        where: {
            role: 'creator',
            nombre: {
                [Op.like]: `%${query}%`
            }
        },
        attributes: ['id', 'nombre', 'email'],
        include: [
            {
                association: 'perfil',
                attributes: ['fotoPerfil', 'banner', 'descripcion']
            },
            {
                association: 'metas',
                attributes: ['id', 'titulo', 'descripcion']
            }
        ]
    });

    return creadores;
};

const obtenerPerfilPublicoDelCreador = async (creadorId) => {
    const creador = await Usuario.findOne({
        where: { id: creadorId, role: 'creator' },
        attributes: ['id', 'nombre', 'email'],
        include: [
            {
                association: 'perfil',
                attributes: ['fotoPerfil', 'banner', 'descripcion']
            },
            {
                association: 'metas',
                attributes: ['id', 'titulo', 'descripcion']
            }
        ]
    });

    if (!creador) throw new Error('El creador no existe');
    return creador;
};

// ── Favoritos ────────────────────────────────────────────────────────────

const agregarAFavoritos = async (seguidorId, creadorId) => {
    // Verificar que el creador exista
    const creador = await Usuario.findByPk(creadorId);
    if (!creador || creador.role !== 'creator') {
        throw new Error('El creador no existe');
    }

    // Verificar que no esté ya en favoritos
    const existe = await Favorito.findOne({
        where: { seguidorId, creadorId }
    });

    if (existe) throw new Error('El creador ya está en tus favoritos');

    return await Favorito.create({ seguidorId, creadorId });
};

const removerDeFavoritos = async (seguidorId, creadorId) => {
    const favorito = await Favorito.findOne({
        where: { seguidorId, creadorId }
    });

    if (!favorito) throw new Error('El creador no está en tus favoritos');

    await favorito.destroy();
    return { message: 'Removido de favoritos' };
};

const obtenerFavoritos = async (seguidorId) => {
    return await Favorito.findAll({
        where: { seguidorId },
        include: [
            {
                association: 'creador',
                attributes: ['id', 'nombre', 'email'],
                include: [
                    {
                        association: 'perfil',
                        attributes: ['fotoPerfil', 'banner', 'descripcion']
                    }
                ]
            }
        ]
    });
};

const esFavorito = async (seguidorId, creadorId) => {
    const favorito = await Favorito.findOne({
        where: { seguidorId, creadorId }
    });
    return !!favorito;
};

// ── Feed ─────────────────────────────────────────────────────────────────

const obtenerFeed = async (seguidorId) => {
    // Obtener los creadores a los que el seguidor ha donado
    const donaciones = await Donacion.findAll({
        where: { seguidorId },
        attributes: ['creadorId'],
        raw: true
    });

    const creadorIds = donaciones.map(d => d.creadorId);

    if (creadorIds.length === 0) {
        return [];
    }

    // Obtener todos los posts de esos creadores, ordenados por fecha
    const posts = await Post.findAll({
        where: { usuarioId: creadorIds },
        include: [
            {
                association: 'creador',
                attributes: ['id', 'nombre', 'email']
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    return posts;
}; 

module.exports = {
    buscarCreadores,
    obtenerPerfilPublicoDelCreador,
    agregarAFavoritos,
    removerDeFavoritos,
    obtenerFavoritos,
    esFavorito,
    obtenerFeed
};
