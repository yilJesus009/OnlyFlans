const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // 'creator' o 'follower'
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'follower'
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: { include: ['password'] }
            }
        }
    });

    return Usuario;
};
