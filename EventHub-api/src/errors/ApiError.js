/**
 * Base class for every operational (expected) error in the app.
 * Concrete subclasses (BadRequestError, NotFoundError...) set their
 * own statusCode and name. Anything thrown as ApiError is trusted by
 * the central error handler to be safe to show to the client.
 */

class ApiError extends Error {
    constructor(message, statusCode, code, details = null) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;