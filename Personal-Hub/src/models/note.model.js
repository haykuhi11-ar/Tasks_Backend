const { readJson, writeJson } = require("../utils/fileDb");


async function notesRead() {
    const notes = await readJson('notes.json');
    return notes;
}

async function notesWrite(notes) {
    await writeJson( 'notes.json',notes);
}

module.exports = { notesRead, notesWrite };