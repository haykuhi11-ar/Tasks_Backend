const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const validateMiddleware = require('../middlewares/validate.middleware');
const noteController = require('../controllers/notes.controller');
const router = express.Router();

router.get('/notes', authMiddleware, noteController.getControl);
router.get('/notes/:id',authMiddleware, noteController.getByIdControl);
router.post('/notes',authMiddleware, validateMiddleware, noteController.poctNoteControl);
router.patch('/notes/:id', authMiddleware, validateMiddleware, noteController.patchNotesControl);
router.delete('/notes/:id', authMiddleware, noteController.deleteNoteControl);

module.exports = router;