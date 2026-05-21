const booksService = require('../services/books.service');
const AppError = require('../utils/AppError');
const date = require('../utils/date');
const generateId = require('../utils/id');

async function getControl(req, res) {
    const ownerId = req.ownerId;
    const books = await booksService.getBooks(ownerId);
    if (!books) {
        throw new AppError('Books not found', 404);
    }
    return res.status(200).json(books);
}

async function getByIdControl(req, res) {
    const ownerId = req.ownerId;
    const id = Number(req.params.id);
    const book = await booksService.getBookById(id, ownerId);
    if (!book) {
        throw new AppError('Book not found', 404);
    }
    res.status(200).json(book);
}

async function postBookControl(req, res) {
    const ownerId = req.ownerId;
    const books = await booksService.getBooks(ownerId);
    const id = generateId(books);
    const newBook = {
        id,
        ownerId,
        ...req.body,
        status: 'to-read',
        rating: null,
        createdAt: date()
    }
    await booksService.addBook(newBook);
    return res.status(201).json(newBook);
}

async function patchBookControl(req, res) {
    const ownerId = req.ownerId;
    const id = Number(req.params.id);
    const book = await booksService.updateBook(id, ownerId, req.body);

    if (!book) {
        throw new AppError('Book not found', 404);
    }
    return res.status(200).json(book);
}

async function deleteBookControl(req, res) {
    const ownerId = req.ownerId;
    const id = Number(req.params.id);

    const deleted = await booksService.deleteBook(id, ownerId);
    if (!deleted) {
        throw new AppError('Book not found', 404);       
    }
    res.status(204).send();
}

module.exports = {
    getControl,
    getByIdControl,
    postBookControl,
    patchBookControl,
    deleteBookControl
}