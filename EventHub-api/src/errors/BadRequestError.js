const ApiError = require("./ApiError");
const ERROR_CODES = require("./error.codes");

/** 400 — malformed input, failed validation. */

class BadRequestError extends ApiError {
    constructor(message = 'Bad request', code = ERROR_CODES.VALIDATION_ERROR, details = null) {
        super(message, 400, code, details)
    }
}

module.exports = BadRequestError;