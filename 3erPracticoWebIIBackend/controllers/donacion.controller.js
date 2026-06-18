const donacionService = require('../services/donacion.service');


const crearDonacion = async (req, res) => {
    try {
        const { creadorId, cantidad } = req.body;
        const seguidorId = req.user.id;

        if (!creadorId) {
            return res.status(400).json({ message: 'creadorId es requerido' });
        }

        const donacion = await donacionService.crearDonacion(seguidorId, creadorId, cantidad);
        return res.status(201).json(donacion);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

//donaciones seguidor
const obtenerHistorial = async (req, res) => {
    try {
        const seguidorId = req.user.id;
        const { fechaInicio, fechaFin, nombreCreador } = req.query;

        const historial = await donacionService.obtenerHistorialDonaciones(seguidorId, {
            fechaInicio,
            fechaFin,
            nombreCreador
        });

        return res.json(historial);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

//requiere seguidor haya donado
const obtenerPostsDelCreador = async (req, res) => {
    try {
        const { creadorId } = req.params;
        const seguidorId = req.user.id;

        const posts = await donacionService.obtenerPostsAccessibles(seguidorId, parseInt(creadorId));
        return res.json(posts);
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
};

// Crear comentario en post
const crearComentario = async (req, res) => {
    try {
        const { postId, texto } = req.body;
        const seguidorId = req.user.id;

        if (!postId || !texto || texto.trim() === '') {
            return res.status(400).json({ message: 'postId y texto son requeridos' });
        }

        const comentario = await donacionService.crearComentario(seguidorId, postId, texto);
        return res.status(201).json(comentario);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

//comentarios de un post (solo el creador)
const obtenerComentariosDelPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const creadorId = req.user.id;

        const comentarios = await donacionService.obtenerComentariosDelPost(postId, creadorId);
        return res.json(comentarios);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

module.exports = {
    crearDonacion,
    obtenerHistorial,
    obtenerPostsDelCreador,
    crearComentario,
    obtenerComentariosDelPost
};
