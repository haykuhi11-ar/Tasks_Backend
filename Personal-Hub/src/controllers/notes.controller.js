const notesService = require('../services/notes.service');
const AppError = require('../utils/AppError');
const date = require('../utils/date');
const generateId = require('../utils/id');

async function getControl(req, res) {
    const ownerId = req.ownerId;
    const notes = await notesService.getNotes(ownerId);
    if (!notes.length) {
        throw new AppError('Notes not found', 404);
    }
    return res.status(200).json(notes);
}

async function getByIdControl(req, res) {
    const ownerId = req.ownerId;
    const id = Number(req.params.id);
    const note = await notesService.getNotesById(id, ownerId);
    if (!note) {
        throw new AppError('Note not found', 404);
    }
    return res.status(200).json(note);
}

async function poctNoteControl(req, res) {
    const ownerId = req.ownerId;
    const notes = await notesService.getNotes(ownerId);
    const id = generateId(notes);
    const newNote = {
        id,
        ownerId,
        ...req.body,
        createdAt: date()
    }
    await notesService.addNotes(newNote);
    return res.status(201).json(newNote);
}

async function patchNotesControl(req, res) {
    const ownerId = req.ownerId;
    const id = Number(req.params.id);
    const note = await notesService.updateNote(id, ownerId, req.body);
    if (!note) {
        throw new AppError('Note not found', 404);
    }
    return res.status(200).json(note);
}

async function deleteNoteControl(req, res) {
    const ownerId = req.ownerId;
    const id = Number(req.params.id);
    const deleted = await notesService.deleteNote(id, ownerId);
    if (!deleted) {
        throw new AppError('Note not found', 404);
    }
    return res.status(204).send();
}

module.exports = {
    getControl,
    getByIdControl,
    poctNoteControl,
    patchNotesControl,
    deleteNoteControl
}