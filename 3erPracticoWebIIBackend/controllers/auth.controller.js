const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { nombre, email, password, role } = req.body;
        const result = await authService.register({ nombre, email, password, role });
        return res.status(201).json(result);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login({ email, password });
        return res.status(200).json(result);
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

const me = (req, res) => {
    // req.user viene del middleware requireAuth
    return res.status(200).json({ usuario: req.user });
}; 

module.exports = { register, login, me };
