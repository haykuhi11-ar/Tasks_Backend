const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/env');
const AppError = require('./AppError');

function signToken(payload) {
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    return token;
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET);
        return decoded;
    } catch {
        throw new AppError('Token invalid', 403);
    }
}

module.exports = { signToken, verifyToken }