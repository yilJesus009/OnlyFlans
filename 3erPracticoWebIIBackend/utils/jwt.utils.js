const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'onlyflans_secret';

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '24h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};

module.exports = { generateToken, verifyToken };
