const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Meta = sequelize.define('Meta', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
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

    return Meta;
};
