const express = require('express');
const router = express.Router();
const seguidorController = require('../controllers/seguidor.controller');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');

// Todas estas rutas requieren estar autenticado y tener rol 'follower'
router.use(requireAuth, requireRole('follower'));

// ── Búsqueda ─────────────────────────────────────────────────────────────
// GET /api/seguidor/buscar?q=nombre
router.get('/buscar', seguidorController.buscarCreadores);

// GET /api/seguidor/creador/:id
router.get('/creador/:id', seguidorController.obtenerPerfilCreador);

// ── Favoritos ────────────────────────────────────────────────────────────
router.post('/favoritos', seguidorController.agregarAFavoritos);
router.delete('/favoritos/:creadorId', seguidorController.removerDeFavoritos);
router.get('/favoritos', seguidorController.obtenerFavoritos);

// ── Feed ─────────────────────────────────────────────────────────────────
router.get('/feed', seguidorController.obtenerFeed);

module.exports = router;
