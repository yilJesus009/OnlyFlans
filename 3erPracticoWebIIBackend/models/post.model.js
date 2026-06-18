const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define('Post', {
        texto: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Post;
};
