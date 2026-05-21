const express = require('express');
const router = express.Router();

const authRouter = require('../routes/auth.routes');
const booksRouter = require('../routes/books.routes');
const habitsRouter = require('../routes/habits.routes');
const notesRouter = require('../routes/notes.routes');

router.use(authRouter);
router.use(booksRouter);
router.use(habitsRouter);
router.use(notesRouter);

module.exports = router;