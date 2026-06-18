const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Donacion = sequelize.define('Donacion', {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
    
        seguidorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        creadorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Donacion;
};
