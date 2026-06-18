const seguidorService = require('../services/seguidor.service');

// ── Búsqueda ─────────────────────────────────────────────────────────────

const buscarCreadores = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === '') {
            return res.status(400).json({ message: 'Parámetro "q" (búsqueda) es requerido' });
        }

        const creadores = await seguidorService.buscarCreadores(q);
        return res.json(creadores);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const obtenerPerfilCreador = async (req, res) => {
    try {
        const { id } = req.params;
        const creador = await seguidorService.obtenerPerfilPublicoDelCreador(id);
        return res.json(creador);
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

// ── Favoritos ────────────────────────────────────────────────────────────

const agregarAFavoritos = async (req, res) => {
    try {
        const { creadorId } = req.body;
        const seguidorId = req.user.id;

        if (!creadorId) {
            return res.status(400).json({ message: 'creadorId es requerido' });
        }

        const favorito = await seguidorService.agregarAFavoritos(seguidorId, creadorId);
        return res.status(201).json(favorito);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const removerDeFavoritos = async (req, res) => {
    try {
        const { creadorId } = req.params;
        const seguidorId = req.user.id;

        const result = await seguidorService.removerDeFavoritos(seguidorId, creadorId);
        return res.json(result);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const obtenerFavoritos = async (req, res) => {
    try {
        const seguidorId = req.user.id;
        const favoritos = await seguidorService.obtenerFavoritos(seguidorId);
        return res.json(favoritos);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

// ── Feed ─────────────────────────────────────────────────────────────────

const obtenerFeed = async (req, res) => {
    try {
        const seguidorId = req.user.id;
        const feed = await seguidorService.obtenerFeed(seguidorId);
        return res.json(feed);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

module.exports = {
    buscarCreadores,
    obtenerPerfilCreador,
    agregarAFavoritos,
    removerDeFavoritos,
    obtenerFavoritos,
    obtenerFeed
};
