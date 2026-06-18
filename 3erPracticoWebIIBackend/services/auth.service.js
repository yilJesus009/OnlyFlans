const sha1 = require('sha1');
const { Usuario } = require('../models');
const { generateToken } = require('../utils/jwt.utils');

const register = async ({ nombre, email, password, role }) => {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) throw new Error('El email ya está registrado');

    const usuario = await Usuario.create({
        nombre,
        email,
        password: sha1(password),
        role
    });

    const token = generateToken({
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        role: usuario.role
    });

    return { token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, role: usuario.role } };
};

const login = async ({ email, password }) => {
    const usuario = await Usuario.scope('withPassword').findOne({ where: { email } });
    if (!usuario) throw new Error('Credenciales incorrectas');

    if (usuario.password !== sha1(password)) throw new Error('Credenciales incorrectas');

    const token = generateToken({
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        role: usuario.role
    });

    return { token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, role: usuario.role } };
};

module.exports = { register, login };
