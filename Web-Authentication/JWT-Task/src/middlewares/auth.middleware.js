const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/token");

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError('No token', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = verifyToken(token);
        next();

    } catch {
        throw new AppError('Invalid token', 401);
    }
}

module.exports = auth;