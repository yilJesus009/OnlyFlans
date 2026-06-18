const express = require('express');
const router = express.Router();
const creadorController = require('../controllers/creador.controller');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');


router.use(requireAuth, requireRole('creator'));

// ── Perfil ───────────────────────────────────────────────────────────────
router.get('/perfil', creadorController.obtenerMiPerfil);
router.put('/perfil', upload.fields([
    { name: 'fotoPerfil', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]), creadorController.actualizarPerfil);

// ── Posts ────────────────────────────────────────────────────────────────
router.post('/posts', upload.single('imagen'), creadorController.crearPost);
router.get('/posts', creadorController.obtenerMisPost);
router.put('/posts/:id', upload.single('imagen'), creadorController.editarPost);
router.delete('/posts/:id', creadorController.eliminarPost);

// ── Metas ────────────────────────────────────────────────────────────────
router.post('/metas', creadorController.crearMeta);
router.get('/metas', creadorController.obtenerMisMetas);
router.put('/metas/:id', creadorController.editarMeta);
router.delete('/metas/:id', creadorController.eliminarMeta);

module.exports = router;
