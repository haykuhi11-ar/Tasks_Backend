const { UnauthorizedError } = require("../errors");
const ERROR_CODES = require("../errors/error.codes");
const RefreshToken = require("../models/RefreshToken");
const User = require('../models/User')
const {
    signAccessToken,
    generateRefreshToken,
    hashToken,
    expiryRefreshToken
} = require("../utils/tokens");

const refreshTokenCache = require('./refreshTokenCache.service');

async function issueTokenPair(user) {
    const accessToken = signAccessToken(user);

    const rawRefreshToken = generateRefreshToken();
    const tokenHash = hashToken(rawRefreshToken);
    const expiresAt = expiryRefreshToken();

    await RefreshToken.create({ user: user._id, tokenHash, expiresAt });

    const ttlSeconds = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
    await refreshTokenCache.set(tokenHash, user._id.toString(), ttlSeconds);

    return { accessToken, refreshToken: rawRefreshToken };
}

async function revocedAllUserTokens(userId) {
    const activeTokens = await RefreshToken.find({ user: userId, revokedAt: null });
    await RefreshToken.updateMany(
        { user: userId, revokedAt: null },
        { revokedAt: new Date() }
    );

    await Promise.all(
        activeTokens.map(t => refreshTokenCache.invalidate(t.tokenHash))
    );
}

async function findActiveRefreshToken(tokenHash) {
    const cached = await refreshTokenCache.get(tokenHash);
    if (cached) {
        return { userId: cached.userId, tokenHash, fromCache: true };
    }

    const doc = await RefreshToken.findOne({ tokenHash });

    if (!doc) {
        throw new UnauthorizedError('Invalid refresh token', ERROR_CODES.REFRESH_TOKEN_INVALID);
    }

    if (doc.revokedAt) {
        await revocedAllUserTokens(doc.user);
        throw new UnauthorizedError('Refresh token has already been used', ERROR_CODES.REFRESH_TOKEN_REUSED);
    }

    if (!doc.isActive()) {
        throw new UnauthorizedError('Refresh token expired', ERROR_CODES.REFRESH_TOKEN_INVALID);
    }

    const ttlSeconds = Math.floor((doc.expiresAt.getTime() - Date.now()) / 1000);
    await refreshTokenCache.set(tokenHash, doc.user.toString(), ttlSeconds);

    return { userId: doc.user.toString(), tokenHash, fromCache: false };
}

async function rotateRefreshToken(rawToken) {
    const tokenHash = hashToken(rawToken);
    const { userId } = await findActiveRefreshToken(tokenHash);

    const user = await User.findById(userId);
    if (!user) {
        throw new UnauthorizedError('Invalid refresh token', ERROR_CODES.REFRESH_TOKEN_INVALID);
    }

    await RefreshToken.findOneAndUpdate(
        { tokenHash },
        { revokedAt: new Date() }
    );

    await refreshTokenCache.invalidate(tokenHash);

    return issueTokenPair(user);
}

module.exports = {
    issueTokenPair,
    findActiveRefreshToken,
    rotateRefreshToken,
    revocedAllUserTokens,
}