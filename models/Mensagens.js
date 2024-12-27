const Sequelize = require('sequelize');
const database = require('../config/database');
const Usuario = require('./Usuario');
const Sala = require('./Sala');
const Mensagens = database.define('mensagens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mensagem: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    salaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

Mensagens.belongsTo(Usuario, {foreignKey: 'usuarioId', allowNull: false});
Mensagens.belongsTo(Sala, {foreignKey: 'usuarioId', allowNull: false});
// Mensagens.sync().then(() => {
//     console.log('Tabela criada com sucesso!');
// });
// Mensagens.sync({alter: true});

module.exports = Mensagens;