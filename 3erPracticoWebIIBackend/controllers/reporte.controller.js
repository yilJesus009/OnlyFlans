const reporteService = require('../services/reporte.service');

const obtenerReporteIngresos = async (req, res) => {
    try {
        const creadorId = req.user.id;
        const { fechaInicio, fechaFin } = req.query;

        const reporte = await reporteService.obtenerReporteIngresos(creadorId, {
            fechaInicio,
            fechaFin
        });

        return res.json(reporte);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

module.exports = {
    obtenerReporteIngresos
};
