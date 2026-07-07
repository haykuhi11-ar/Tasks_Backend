const jwt = require('jsonwebtoken');
const env = require('../config/env');
const crypto = require('crypto');

function signAccessToken(user) {
    return jwt.sign(
        { sub: user._id.toString(), role: user.role },
        env.accessToken.secretKey,
        { expiresIn: env.accessToken.ttl }
    );
}

function verifyAccessToken(token) {
    return jwt.verify(token, env.accessToken.secretKey);
}

function generateRefreshToken() {
    return crypto.randomBytes(48).toString('hex');
}

function hashToken(rawToken) {
    return crypto.createHash('sha256').update(rawToken).digest('hex');
}

function expiryRefreshToken() {
    const days = env.refreshToken.ttlDays;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    hashToken,
    expiryRefreshToken
}