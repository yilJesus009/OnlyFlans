const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Comentario = sequelize.define('Comentario', {
        texto: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seguidorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Comentario;
};
