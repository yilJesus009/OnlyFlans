const { Usuario, PerfilCreador, Post, Meta } = require('../models');

// ── Perfil del Creador ───────────────────────────────────────────────────

const obtenerPerfil = async (usuarioId) => {
    const perfil = await PerfilCreador.findOne({
        where: { usuarioId },
        include: [
            { association: 'usuario', attributes: ['id', 'nombre', 'email'] }
        ]
    });
    return perfil;
};

const crearOActualizarPerfil = async (usuarioId, { descripcion, fotoPerfil, banner }) => {
    const [perfil, created] = await PerfilCreador.findOrCreate({
        where: { usuarioId },
        defaults: { usuarioId, descripcion, fotoPerfil, banner }
    });

    if (!created) {
        if (descripcion !== undefined) perfil.descripcion = descripcion;
        if (fotoPerfil !== undefined) perfil.fotoPerfil = fotoPerfil;
        if (banner !== undefined) perfil.banner = banner;
        await perfil.save();
    }

    return perfil;
};

// ── Posts ────────────────────────────────────────────────────────────────

const crearPost = async (usuarioId, { texto, imagen }) => {
    return await Post.create({
        usuarioId,
        texto,
        imagen
    });
};

const obtenerPostsDelCreador = async (usuarioId) => {
    return await Post.findAll({
        where: { usuarioId },
        order: [['createdAt', 'DESC']]
    });
};

const obtenerPostPorId = async (postId) => {
    return await Post.findByPk(postId, {
        include: [
            { association: 'creador', attributes: ['id', 'nombre'] }
        ]
    });
};

const editarPost = async (postId, usuarioId, { texto, imagen }) => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post no encontrado');
    if (post.usuarioId !== usuarioId) throw new Error('No tienes permiso para editar este post');

    if (texto !== undefined) post.texto = texto;
    if (imagen !== undefined) post.imagen = imagen;
    await post.save();
    return post;
};

const eliminarPost = async (postId, usuarioId) => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post no encontrado');
    if (post.usuarioId !== usuarioId) throw new Error('No tienes permiso para eliminar este post');

    await post.destroy();
    return { message: 'Post eliminado' };
};

// ── Metas de Apoyo ───────────────────────────────────────────────────────

const crearMeta = async (usuarioId, { titulo, descripcion }) => {
    return await Meta.create({
        usuarioId,
        titulo,
        descripcion
    });
};

const obtenerMetasDelCreador = async (usuarioId) => {
    return await Meta.findAll({
        where: { usuarioId }
    });
};

const editarMeta = async (metaId, usuarioId, { titulo, descripcion }) => {
    const meta = await Meta.findByPk(metaId);
    if (!meta) throw new Error('Meta no encontrada');
    if (meta.usuarioId !== usuarioId) throw new Error('No tienes permiso para editar esta meta');

    if (titulo !== undefined) meta.titulo = titulo;
    if (descripcion !== undefined) meta.descripcion = descripcion;
    await meta.save();
    return meta;
};

const eliminarMeta = async (metaId, usuarioId) => {
    const meta = await Meta.findByPk(metaId);
    if (!meta) throw new Error('Meta no encontrada');
    if (meta.usuarioId !== usuarioId) throw new Error('No tienes permiso para eliminar esta meta');

    await meta.destroy();
    return { message: 'Meta eliminada' };
};

module.exports = {
    obtenerPerfil,
    crearOActualizarPerfil,
    crearPost,
    obtenerPostsDelCreador,
    obtenerPostPorId,
    editarPost,
    eliminarPost,
    crearMeta,
    obtenerMetasDelCreador,
    editarMeta,
    eliminarMeta
};
