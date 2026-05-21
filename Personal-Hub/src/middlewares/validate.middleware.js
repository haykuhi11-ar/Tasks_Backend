const AppError = require("../utils/AppError");

function isValidNoteTitle(title) {
    if (title && typeof title === 'string' && title.length < 100) {
        return true;
    }
    return false;
}

function isValidBody(body) {
    if (body && typeof body === 'string' && body.length < 200 ) {
        return true;
    }

    return false;
}

function isValidTags(tags) {
    if (Array.isArray(tags)) {
        for (const tag of tags) {
            if (typeof tag !== 'string' || tag.length > 20 ) return false;
        }
        return true;
    }
}

function isValidBookTitle(title) {
    if (title && typeof title === 'string' && title.length < 200) {
        return true;
    } 
    return false;
}

function isValidAuthor(author) {
    if (author && typeof author === 'string' && author.length < 100) {
        return true;
    }

    return false;
}

function isValidRating(status, rating) {
    if (rating) {
        if (status === 'finished' && Number.isInteger(rating) && rating > 1 && rating < 5) {
            return true;
        }
    }
    return false;
}

function isValidHabitsName(name) {
    if (name && typeof name === 'string' && name.length < 60) {
        return true;
    } 
    return false;
}

function validateMiddleware(req, res, next) {
    const baseUrl = req.baseUrl;
    const {title, body, tags, author, rating, status, name } = req.body;

    if (req.method === 'POST') {
        if (baseUrl === '/books') {
            if (!isValidBookTitle(title)) throw new AppError('Book title is required, must be < 200 characters', 400);
            if (!isValidAuthor(author)) throw new AppError('Author is required, must be a string, must be < 100 characters.', 400);
            if (!isValidRating(rating)) throw new AppError('Rating 1-5, only if status: finished', 400);
        }
        if (baseUrl === '/notes') {
            if (!isValidNoteTitle(title)) throw new AppError('Note title is required, 1-100 chars', 400);
            if (!isValidBody(body)) throw new AppError('Body is required, 1-2000 chars', 400);
            if (!isValidTags(tags)) throw new AppError('Tags array, each 1-20 chars', 400);
        }
        if (baseUrl === '/habits') {
            if (!isValidHabitsName(name)) throw new AppError('Habit name is required, 1-60 chars', 400);
        }
    }
    
    if (req.method === 'Patch') {
        if (baseUrl === '/books') {
            if (title  && !isValidBookTitle(title)) throw new AppError('Book title must be < 200 characters', 400);
            if (author && !isValidAuthor(author)) throw new AppError('Author must be a string, < 100 characters.', 400);
            if (rating && !isValidRating(rating, status)) throw new AppError('Rating must be 1-5 if status: finished', 400);
        }
        if (baseUrl === '/notes') {
            if (title && !isValidNoteTitle(title)) throw new AppError('Note title 1-100 chars', 400);
            if (body && !isValidBody(body)) throw new AppError('Body 1-2000 chars', 400);
            if (tags && !isValidTags(tags)) throw new AppError('Tags array, each 1-20 chars', 400);
        }
        if (baseUrl === '/habits') {
            if (name && !isValidHabitsName(name)) throw new AppError('Habit name 1-60 chars', 400);
        }
    }
    next();
}

module.exports = validateMiddleware;