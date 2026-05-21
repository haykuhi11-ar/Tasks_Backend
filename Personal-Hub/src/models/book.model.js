const { readJson, writeJson } = require("../utils/fileDb");


function booksRead() {
    const books = readJson('books.json');
    return books;
}

function booksWrite(books) {
    writeJson('books.json',books);
}

module.exports = { booksRead, booksWrite }