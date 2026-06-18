const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a SQLite establecida correctamente.');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

module.exports = { sequelize, Sequelize };
