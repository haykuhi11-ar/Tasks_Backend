const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const validateMiddleware = require('../middlewares/validate.middleware');
const booksController = require('../controllers/books.controller');
const router = express.Router();

router.get('/books',authMiddleware, booksController.getControl);
router.get('/books/:id',authMiddleware, booksController.getByIdControl);
router.post('/books', authMiddleware, validateMiddleware, booksController.postBookControl);
router.patch('/books/:id',authMiddleware, validateMiddleware, booksController.patchBookControl);
router.delete('/books/:id',authMiddleware, booksController.deleteBookControl);

module.exports = router;