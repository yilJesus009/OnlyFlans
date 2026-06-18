const { Donacion } = require('../models');
const { Op } = require('sequelize');

// Obtener reporte de ingresos del creador (historial + total)
const obtenerReporteIngresos = async (creadorId, { fechaInicio, fechaFin }) => {
    const where = { creadorId };

    if (fechaInicio || fechaFin) {
        where.createdAt = {};
        if (fechaInicio) where.createdAt[Op.gte] = new Date(fechaInicio);
        if (fechaFin) {
            const fin = new Date(fechaFin);
            fin.setHours(23, 59, 59, 999);
            where.createdAt[Op.lte] = fin;
        }
    }

    const donaciones = await Donacion.findAll({
        where,
        include: [
            { association: 'seguidor', attributes: ['id', 'nombre', 'email'] }
        ],
        order: [['createdAt', 'DESC']]
    });

    // Calcular total
    const totalFlanes = donaciones.reduce((sum, d) => sum + d.cantidad, 0);

    return {
        periodo: {
            fechaInicio: fechaInicio || null,
            fechaFin: fechaFin || null
        },
        totalFlanes,
        cantidadDonaciones: donaciones.length,
        historial: donaciones.map(d => ({
            id: d.id,
            seguidorNombre: d.seguidor.nombre,
            cantidad: d.cantidad,
            fecha: d.createdAt
        }))
    };
};

module.exports = {
    obtenerReporteIngresos
};
