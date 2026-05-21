const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/token");

function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new AppError('No token provided', 401);
        }

        const decoded = verifyToken(token);
        req.ownerId = decoded.id;
        next();
        
    } catch (error) {
        throw new AppError('Tokebn expired', 401);
    }

}

module.exports = { authMiddleware}