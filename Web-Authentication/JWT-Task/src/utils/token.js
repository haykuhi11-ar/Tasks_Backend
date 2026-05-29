const jwt = require('jsonwebtoken');
require('dotenv').config();
const KEY = process.env.JWT_SECRET;

function signToken(peyload) {
    const token = jwt.sign(peyload, KEY, {expiresIn: '1h'});
    return token;
}

function verifyToken(token) {
    const decode = jwt.verify(token, KEY);
    return decode;
}

module.exports = {
    signToken,
    verifyToken
};