const Sequelize = require('sequelize');
const database = require('../config/database');

const Sala = database.define('salas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

// Sala.sync().then(() => {
//     console.log('Tabela criada com sucesso!');
// });

module.exports = Sala;