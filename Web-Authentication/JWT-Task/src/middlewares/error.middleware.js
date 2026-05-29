const AppError = require("../utils/AppError");

function error(err, req, res, next) {
    const isKnown = err instanceof AppError;
    const message = isKnown ? err.message : 'Internal server error';
    const statusCode = isKnown ? err.statusCode: 500;

    return res.status(statusCode).json({
        message:  message 
    });
}

module.exports = error;