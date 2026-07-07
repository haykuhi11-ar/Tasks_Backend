const ApiError = require("./ApiError");
const ERROR_CODES = require("./error.codes");

class ConflictError extends ApiError {
    constructor(message = 'Conflict', code = ERROR_CODES.EVENT_FULL, details = null) {
        super(message, 409, code, details);
    }
}

module.exports = ConflictError;