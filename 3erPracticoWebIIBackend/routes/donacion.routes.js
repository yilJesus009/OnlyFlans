const express = require('express');
const router = express.Router();
const donacionController = require('../controllers/donacion.controller');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');

// ───────────────────────────────────────────────────
router.post('/', 
    requireAuth, 
    requireRole('follower'), 
    donacionController.crearDonacion
);

router.get('/historial', 
    requireAuth, 
    requireRole('follower'), 
    donacionController.obtenerHistorial
);

router.get('/creador/:creadorId/posts', 
    requireAuth, 
    requireRole('follower'), 
    donacionController.obtenerPostsDelCreador
);

router.post('/comentario', 
    requireAuth, 
    requireRole('follower'), 
    donacionController.crearComentario
);

// ──CREADORES─────────────────────────────────────────────────
router.get('/posts/:postId/comentarios', 
    requireAuth, 
    requireRole('creator'), 
    donacionController.obtenerComentariosDelPost
);

module.exports = router;
