const { BadRequestError, UnauthorizedError } = require("../errors");
const ERROR_CODES = require("../errors/error.codes");
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken')
const { comparePassword } = require("../utils/password");
const utilsTokens = require('../utils/tokens');
const { issueTokenPair } = require("./refreshToken.service");
const refreshTokenCache = require("./refreshTokenCache.service");


async function register({ name, email, password, role }) {
    const existing = await User.findOne({ email });

    if (existing) {
        throw new BadRequestError(
            'Email is already registered',
            ERROR_CODES.EMAIL_ALREADY_REGISTERED
        );
    }

    const user = await User.create({ name, email, passwordHash: password, role });

    const tokens = await issueTokenPair(user);
    return { user: user.toJSON(), ...tokens };
}

async function login({ email, password }) {
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
        throw new UnauthorizedError('Invalid credentials', ERROR_CODES.INVALID_CREDENTIALS);
    }

    const passwordMatches = await comparePassword(password, user.passwordHash);
    if (!passwordMatches) {
        throw new UnauthorizedError('Invalid credentials', ERROR_CODES.INVALID_CREDENTIALS);
    }

    const tokens = await issueTokenPair(user);
    return { user: user.toJSON(), ...tokens };
}

async function logout(rawToken) {
    const tokenHash = utilsTokens.hashToken(rawToken);

    await RefreshToken.findOneAndUpdate(
        { tokenHash, revokedAt: null },
        { revokedAt: new Date() }
    );

    await refreshTokenCache.invalidate(tokenHash);
}

async function getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new UnauthorizedError('User no longer exists', ERROR_CODES.USER_NO_LONGER_EXISTS);
    }

    return user.toJSON();
}

module.exports = {
    register,
    login,
    logout,
    getProfile
};
