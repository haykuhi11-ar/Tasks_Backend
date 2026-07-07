/**
 * Wraps an async controller/middleware so that a rejected promise
 * (thrown ApiError, unexpected exception, failed await...) is
 * forwarded to Express's next(err) instead of crashing the process
 * or hanging the request.
 *
 * Without this, every controller would need its own try/catch just
 * to relay errors to the central errorHandler middleware.
 */

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = asyncHandler;