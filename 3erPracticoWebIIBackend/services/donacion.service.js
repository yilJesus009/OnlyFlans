const { Donacion, Usuario, Post, Comentario } = require('../models');
const { Op } = require('sequelize');


const crearDonacion = async (seguidorId, creadorId, cantidad) => {
    if (!cantidad || cantidad < 1) {
        throw new Error('La cantidad de flanes debe ser mayor a 0');
    }

    const creador = await Usuario.findByPk(creadorId);
    if (!creador || creador.role !== 'creator') {
        throw new Error('El creador no existe');
    }

    return await Donacion.create({
        seguidorId,
        creadorId,
        cantidad
    });
};


const yaHaDonado = async (seguidorId, creadorId) => {
    const donacion = await Donacion.findOne({
        where: { seguidorId, creadorId }
    });
    return !!donacion;
};

//historial donaciones seguidor
const obtenerHistorialDonaciones = async (seguidorId, { fechaInicio, fechaFin, nombreCreador }) => {
    const where = { seguidorId };

    if (fechaInicio || fechaFin) {
        where.createdAt = {};
        if (fechaInicio) where.createdAt[Op.gte] = new Date(fechaInicio);
        if (fechaFin) {
            const fin = new Date(fechaFin);
            fin.setHours(23, 59, 59, 999);
            where.createdAt[Op.lte] = fin;
        }
    }

    let include = [
        { association: 'creador', attributes: ['id', 'nombre', 'email'] }
    ];

    const donaciones = await Donacion.findAll({
        where,
        include,
        order: [['createdAt', 'DESC']]
    });

    // filtrar por nombre
    if (nombreCreador) {
        return donaciones.filter(d => 
            d.creador.nombre.toLowerCase().includes(nombreCreador.toLowerCase())
        );
    }

    return donaciones;
};

//publicaciones creador (solo si seguidor dono)
const obtenerPostsAccessibles = async (seguidorId, creadorId) => {
    
    const creador = await Usuario.findByPk(creadorId);
    if (!creador || creador.role !== 'creator') {
        throw new Error('El creador no existe');
    }

    // verificar si dono
    const haDonado = await yaHaDonado(seguidorId, creadorId);
    if (!haDonado) {
        throw new Error('Debe realizar una donación para ver el contenido de este creador');
    }

    //posts del creador con comentarios
    return await Post.findAll({
        where: { usuarioId: creadorId },
        include: [
            { 
                association: 'comentarios',
                attributes: ['id', 'texto', 'createdAt'],
                include: [
                    { association: 'seguidor', attributes: ['id', 'nombre'] }
                ]
            }
        ],
        order: [['createdAt', 'DESC']]
    });
};


const crearComentario = async (seguidorId, postId, texto) => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post no encontrado');

    // Verificar que el seguidor haya donado al creador del post
    const haDonado = await yaHaDonado(seguidorId, post.usuarioId);
    if (!haDonado) {
        throw new Error('Debe realizar una donación para comentar');
    }

    return await Comentario.create({
        texto,
        postId,
        seguidorId
    });
};


const obtenerComentariosDelPost = async (postId, creadorId) => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post no encontrado');
    if (post.usuarioId !== creadorId) throw new Error('No tienes permiso para ver los comentarios de este post');

    return await Comentario.findAll({
        where: { postId },
        include: [
            { association: 'seguidor', attributes: ['id', 'nombre', 'email'] }
        ],
        order: [['createdAt', 'DESC']]
    });
};

module.exports = {
    crearDonacion,
    yaHaDonado,
    obtenerHistorialDonaciones,
    obtenerPostsAccessibles,
    crearComentario,
    obtenerComentariosDelPost
};
