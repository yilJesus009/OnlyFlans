const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');

// Todas estas rutas requieren estar autenticado y ser creador
router.use(requireAuth, requireRole('creator'));

// GET /api/reporte/ingresos?fechaInicio=2024-01-01&fechaFin=2024-12-31
router.get('/ingresos', reporteController.obtenerReporteIngresos);

module.exports = router;
