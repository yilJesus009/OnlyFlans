const { verifyToken } = require('../utils/jwt.utils');

// Verifica que el request tenga un JWT válido
const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    try {
        const payload = verifyToken(token);
        req.user = payload; // { id, email, nombre, role }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

//el usuario tenga el rol correcto
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Acceso denegado: rol incorrecto' });
        }
        next();
    };
};

module.exports = { requireAuth, requireRole };
