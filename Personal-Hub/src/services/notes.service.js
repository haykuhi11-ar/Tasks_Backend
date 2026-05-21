const { notesRead, notesWrite } = require("../models/note.model");
const date = require("../utils/date");

async function getNotes(ownerId) {
    const notes = await notesRead();
    const notesFromUser = notes.filter(n => 
        n.ownerId === ownerId
    );
    return notesFromUser || null;
}

async function getNotesById(id, ownerId) {
    const notes = await notesRead();

    const note = notes.find(n => 
        n.id === id &&
        n.ownerId === ownerId
    );
    return note || null;
}

async function addNotes(note) {
    const notes = await notesRead();

    notes.push(note);
    await notesWrite(notes);
    return notes;
}

async function updateNote(id, ownerId, updateData) {
    const notes = await notesRead();

    const index = notes.findIndex(note => 
        note.id === id &&
        note.ownerId === ownerId
    );

    if (index === -1) return null;
    notes[index] = {
        ...notes[index],
        ...updateData,
        updateAt: date()
    }
    await notesWrite(notes);
    return notes[index];
}

async function deleteNote(id, ownerId) {
    let notes = await notesRead();

    const index = notes.findIndex(note => 
        note.id === id &&
        note.ownerId === ownerId
    );

    if (index === -1) return null;

    notes = notes.filter(note => 
        !(note.id === id &&
        note.ownerId === ownerId)
    );

    const deletedNote = notes[index];
    await notesWrite(notes);
    return deletedNote;
}

module.exports = {
    getNotes,
    getNotesById,
    addNotes,
    updateNote,
    deleteNote
}