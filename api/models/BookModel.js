const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const database = require('../config/db');

// Definir o modelo do livro
const Book = database.define('Book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_lancamento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    numero_edicao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    local_lancamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_barras: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'books',
    timestamps: true //adicionar colunas como created and updated 
});

module.exports = Book;
