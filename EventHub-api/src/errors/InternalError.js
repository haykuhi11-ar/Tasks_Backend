const ApiError = require("./ApiError");
const ERROR_CODES = require("./error.codes");

/** 500 — something unexpected on our side. Message shown to the
 *  client is intentionally generic; real details go to server logs only. */

class InternalError extends ApiError {
    constructor(message = 'Internal server error', code = ERROR_CODES.INTERNAL_ERROR) {
        super(message, 500, code);
    }
}

module.exports = InternalError;