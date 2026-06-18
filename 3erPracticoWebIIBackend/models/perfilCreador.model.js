const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PerfilCreador = sequelize.define('PerfilCreador', {
        fotoPerfil: {
            type: DataTypes.STRING,
            allowNull: true
        },
        banner: {
            type: DataTypes.STRING,
            allowNull: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return PerfilCreador;
};
