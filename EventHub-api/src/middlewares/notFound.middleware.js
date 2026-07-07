const { NotFoundError } = require('../errors');
const ERROR_CODES = require('../errors/error.codes');

/**
 * Catches any request that didn't match a defined route.
 * Must be registered in app.js AFTER all routes but BEFORE errorHandler.
 */

function notFound(req, res, next) {
    next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`, ERROR_CODES.ROUTE_NOT_FOUND));
}

module.exports = notFound;