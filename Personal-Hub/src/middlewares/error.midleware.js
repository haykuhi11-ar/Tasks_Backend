const AppError = require('../utils/AppError');

function errorMiddleware(err, req, res, next) {
    const isKnown = err instanceof AppError;
    const status = isKnown ? err.statusCode : 500;
    const message = isKnown ? err.message : 'Internal Server Error';

    if (!isKnown) {
        console.error(err);
    }

    res.status(status).json({
        error: { message, status }
    });
}

module.exports = errorMiddleware;
