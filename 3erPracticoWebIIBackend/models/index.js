const { sequelize } = require('../config/db.config');

const Usuario      = require('./usuario.model')(sequelize);
const PerfilCreador = require('./perfilCreador.model')(sequelize);
const Meta         = require('./meta.model')(sequelize);
const Post         = require('./post.model')(sequelize);
const Donacion     = require('./donacion.model')(sequelize);
const Comentario   = require('./comentario.model')(sequelize);
const Favorito     = require('./favorito.model')(sequelize);

// ── Asociaciones ─────────────────────────────────────────────────────────────

// Un creador tiene un perfil
Usuario.hasOne(PerfilCreador, { foreignKey: 'usuarioId', as: 'perfil' });
PerfilCreador.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

// Un creador puede tener muchas metas
Usuario.hasMany(Meta, { foreignKey: 'usuarioId', as: 'metas' });
Meta.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'creador' });

// Un creador tiene muchos posts
Usuario.hasMany(Post, { foreignKey: 'usuarioId', as: 'posts' });
Post.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'creador' });

// Un post puede tener muchos comentarios
Post.hasMany(Comentario, { foreignKey: 'postId', as: 'comentarios' });
Comentario.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

// Un seguidor hace muchos comentarios
Usuario.hasMany(Comentario, { foreignKey: 'seguidorId', as: 'comentariosHechos' });
Comentario.belongsTo(Usuario, { foreignKey: 'seguidorId', as: 'seguidor' });

// Donaciones: seguidor → creador
Usuario.hasMany(Donacion, { foreignKey: 'seguidorId', as: 'donacionesHechas' });
Usuario.hasMany(Donacion, { foreignKey: 'creadorId', as: 'donacionesRecibidas' });
Donacion.belongsTo(Usuario, { foreignKey: 'seguidorId', as: 'seguidor' });
Donacion.belongsTo(Usuario, { foreignKey: 'creadorId', as: 'creador' });

// Favoritos: seguidor marca creadores
Usuario.hasMany(Favorito, { foreignKey: 'seguidorId', as: 'favoritos' });
Favorito.belongsTo(Usuario, { foreignKey: 'seguidorId', as: 'seguidor' });
Favorito.belongsTo(Usuario, { foreignKey: 'creadorId', as: 'creador' });

module.exports = {
    sequelize,
    Usuario,
    PerfilCreador,
    Meta,
    Post,
    Donacion,
    Comentario,
    Favorito
};
