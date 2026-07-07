const ApiError = require("./ApiError");
const ERROR_CODES = require("./error.codes");

/** 404 — resource doesn't exist (or, for privacy, isn't visible to this user). */

class NotFoundError extends ApiError {
    constructor(message = 'Resource not found', code = ERROR_CODES.EVENT_NOT_FOUND) {
        super(message, 404, code);
    }
}

module.exports = NotFoundError;