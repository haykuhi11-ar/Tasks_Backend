const { booksRead, booksWrite } = require("../models/book.model");

async function getBooks(ownerId) {
    const books = await booksRead();
    const booksFromUser =  books.filter(book => 
        book.ownerId === ownerId
    )
    return booksFromUser || null;
}

async function getBookById(id, ownerId) {
    const books = await booksRead();
    const book = books.find(b => 
        b.id === id &&
        b.ownerId === ownerId
    );
    return book || null;
}

async function addBook(book) {
    const books = await booksRead();
    books.push(book);
    await booksWrite(books);
    return books;
}

async function updateBook(id,ownerId, updateData) {
    const books = await booksRead();
    const index = books.findIndex(b => 
        b.id === id &&
        b.ownerId === ownerId
    );

    if (index === -1) return null;

    books[index] = {
        ...books[index],
        ...updateData
    };

    await booksWrite(books);
    return books[index];
}

async function deleteBook(id, ownerId) {
    let books = await booksRead();
    const index = books.findIndex(b => 
        b.id === id &&
        b.ownerId === ownerId
    );
    if (index === -1) return null;

    const deletedBook = books[index];
    books = books.filter(book => 
        !(book.id === id && 
        book.ownerId === ownerId)
    );
    await  booksWrite(books);
    return deletedBook;
}

module.exports = { 
    getBooks, 
    getBookById, 
    addBook, 
    updateBook, 
    deleteBook 
}