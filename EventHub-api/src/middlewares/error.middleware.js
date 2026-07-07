const { ApiError } = require("../errors");
const ERROR_CODES = require("../errors/error.codes");

function errorMiddleware(err, req, res, next) {
    const isApiError = err instanceof ApiError;
    const statusCode = isApiError ? err.statusCode : 500;
    const message = isApiError ? err.message : 'Internal server error';
    const code = isApiError ? err.code : ERROR_CODES.INTERNAL_ERROR;

    if (!isApiError) console.error(err);

    res.status(statusCode).json({
        error: {
            code,
            message,
            details: isApiError ? err.details : undefined
        }
    });
}

module.exports = errorMiddleware;