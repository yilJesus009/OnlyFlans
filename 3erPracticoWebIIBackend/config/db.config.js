const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite') // Ruta limpia y absoluta
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a SQLite establecida correctamente.');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

module.exports = { sequelize, Sequelize };