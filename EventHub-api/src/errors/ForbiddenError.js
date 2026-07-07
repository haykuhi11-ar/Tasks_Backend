const ApiError = require("./ApiError");
const ERROR_CODES = require("./error.codes");

/** 403 — authenticated, but not allowed to perform this action
 *  (e.g. member trying to create an event, organizer editing someone
 *  else's event). */

class ForbiddenError extends ApiError {
    constructor(message = 'Forbidden', code = ERROR_CODES.ROLE_NOT_ALLOWED) {
        super(message, 403, code);
    }
}

module.exports = ForbiddenError;