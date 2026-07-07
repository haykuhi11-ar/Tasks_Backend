const ERROR_CODES = require("../errors/error.codes");
const UnauthorizedError = require("../errors");
const { verifyAccessToken } = require("../utils/tokens");


function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new UnauthorizedError('Missing access token', ERROR_CODES.TOKEN_MISSING));
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = verifyAccessToken(token);
        req.user = { id: payload.sub, role: payload.role};
        return next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new UnauthorizedError('Access token expired', ERROR_CODES.TOKEN_EXPIRED));
        }
        return next(new UnauthorizedError('Invalid access token', ERROR_CODES.TOKEN_INVALID));
    }
}

module.exports = authMiddleware;