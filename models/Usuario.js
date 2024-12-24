const Sequelize = require('sequelize');
const database = require('../config/database');

const Usuario = database.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Usuario.sync().then(() => {
//     console.log('Tabela criada com sucesso!');
// });

module.exports = Usuario;
