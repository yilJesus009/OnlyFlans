const authRoutes = require('./auth.routes');
const creadorRoutes = require('./creador.routes');
const donacionRoutes = require('./donacion.routes');
const seguidorRoutes = require('./seguidor.routes');
const reporteRoutes = require('./reporte.routes');

module.exports = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/creador', creadorRoutes);
    app.use('/api/donacion', donacionRoutes);
    app.use('/api/seguidor', seguidorRoutes);
    app.use('/api/reporte', reporteRoutes);

    // Ruta base de salud
    app.get('/', (req, res) => {
        res.json({ message: 'OnlyFlans API funcionando 🍮' });
    });
};
