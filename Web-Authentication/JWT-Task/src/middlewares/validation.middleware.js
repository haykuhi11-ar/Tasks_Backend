const AppError = require("../utils/AppError");

function validUsername(username) {
    if (typeof username === 'string' &&
        username.length < 20
    ) {
        return true;
    }
    return false;
}

function validPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (regex.test(password)) {
        return true;
    }
    return false;
}

function validEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
        return true;
    }
    return false;
}

function isValid(req, res, next) {
    const { username, email, password } = req.body;

    if (!validUsername(username)) {
        throw new AppError('Username must be 3–20 characters, only letters, numbers, or underscores.', 400);
    }
    if (!validEmail(email)) {
        throw new AppError('Invalid email format.', 400);
    }
    if (!validPassword(password)) {
        throw new AppError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.', 400);
    }

    next();
}

module.exports = isValid;