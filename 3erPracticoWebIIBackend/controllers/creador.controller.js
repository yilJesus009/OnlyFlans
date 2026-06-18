const creadorService = require('../services/creador.service');

// ── Perfil ───────────────────────────────────────────────────────────────

const obtenerMiPerfil = async (req, res) => {
    try {
        const perfil = await creadorService.obtenerPerfil(req.user.id);
        return res.json(perfil || { message: 'Perfil no encontrado' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const actualizarPerfil = async (req, res) => {
    try {
        const { descripcion } = req.body;
        const fotoPerfil = req.files?.fotoPerfil ? req.files.fotoPerfil[0].filename : undefined;
        const banner = req.files?.banner ? req.files.banner[0].filename : undefined;

        const perfil = await creadorService.crearOActualizarPerfil(req.user.id, {
            descripcion,
            fotoPerfil,
            banner
        });
        return res.json(perfil);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

// ── Posts ────────────────────────────────────────────────────────────────

const crearPost = async (req, res) => {
    try {
        const { texto } = req.body;
        const imagen = req.file ? req.file.filename : null;

        if (!texto || texto.trim() === '') {
            return res.status(400).json({ message: 'El texto del post es obligatorio' });
        }

        const post = await creadorService.crearPost(req.user.id, { texto, imagen });
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const obtenerMisPost = async (req, res) => {
    try {
        const posts = await creadorService.obtenerPostsDelCreador(req.user.id);
        return res.json(posts);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const editarPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto } = req.body;
        const imagen = req.file ? req.file.filename : undefined;

        const post = await creadorService.editarPost(id, req.user.id, { texto, imagen });
        return res.json(post);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const eliminarPost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await creadorService.eliminarPost(id, req.user.id);
        return res.json(result);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

// ── Metas ────────────────────────────────────────────────────────────────

const crearMeta = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const meta = await creadorService.crearMeta(req.user.id, { titulo, descripcion });
        return res.status(201).json(meta);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const obtenerMisMetas = async (req, res) => {
    try {
        const metas = await creadorService.obtenerMetasDelCreador(req.user.id);
        return res.json(metas);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const editarMeta = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;
        const meta = await creadorService.editarMeta(id, req.user.id, { titulo, descripcion });
        return res.json(meta);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const eliminarMeta = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await creadorService.eliminarMeta(id, req.user.id);
        return res.json(result);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

module.exports = {
    obtenerMiPerfil,
    actualizarPerfil,
    crearPost,
    obtenerMisPost,
    editarPost,
    eliminarPost,
    crearMeta,
    obtenerMisMetas,
    editarMeta,
    eliminarMeta
};
