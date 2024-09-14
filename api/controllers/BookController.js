const Book = require('../models/BookModel');
const { Op } = require('sequelize'); 

// Validação de dados para a criação de um livro
const validateBookData = (data) => {
    const errors = [];

    if (!data.nome || typeof data.nome !== 'string') {
        errors.push('Nome é obrigatório e deve ser uma string.');
    }
    if (!data.autor || typeof data.autor !== 'string') {
        errors.push('Autor é obrigatório e deve ser uma string.');
    }
    if (!data.data_lancamento || isNaN(Date.parse(data.data_lancamento))) {
        errors.push('Data de lançamento é obrigatória e deve ser uma data válida.');
    }
    if (!data.numero_edicao || typeof data.numero_edicao !== 'number') {
        errors.push('Número da edição é obrigatório e deve ser um número.');
    }
    if (!data.local_lancamento || typeof data.local_lancamento !== 'string') {
        errors.push('Local de lançamento é obrigatório e deve ser uma string.');
    }
    if (!data.codigo_barras || typeof data.codigo_barras !== 'string') {
        errors.push('Código de barras é obrigatório e deve ser uma string.');
    }

    return errors;
};

// Listar todos os livros
const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Obter um livro por ID
const getBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Criar um novo livro
const createBook = async (req, res) => {
    try {
        const errors = validateBookData(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // Verificar se o livro já existe pelo código de barras
        const existingBookBarras = await Book.findOne({ where: { codigo_barras: req.body.codigo_barras } });
        if (existingBookBarras) {
            return res.status(400).json({ error: 'Um livro com este código de barras já existe.' });
        }

        // Verificar se o livro já existe pelo nome
        const existingBookName = await Book.findOne({ where: { nome: req.body.nome } });
        if (existingBookName) {
            return res.status(400).json({ error: 'Um livro com este nome já existe.' });
        }

        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Atualizar um livro
const updateBook = async (req, res) => {
    try {
        const errors = validateBookData(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        const existingBookBarras = await Book.findOne({ where: { codigo_barras: req.body.codigo_barras, id: { [Op.ne]: req.params.id } } });
        if (existingBookBarras) {
            return res.status(400).json({ error: 'Um livro com este código de barras já existe.' });
        }

        const existingBookName = await Book.findOne({ where: { nome: req.body.nome, id: { [Op.ne]: req.params.id } } });
        if (existingBookName) {
            return res.status(400).json({ error: 'Um livro com este nome já existe.' });
        }

        const [updated] = await Book.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedBook = await Book.findByPk(req.params.id);
            res.json(updatedBook);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (err) {
        console.error('Erro ao atualizar livro:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

// Deletar um livro
const deleteBook = async (req, res) => {
    try {
        const deleted = await Book.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).send('Book not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};
