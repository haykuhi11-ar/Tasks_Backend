const ApiError = require("./ApiError");
const ERROR_CODES = require("./error.codes");

/** 401 — missing/invalid/expired credentials (access token, login). */

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized', code = ERROR_CODES.TOKEN_INVALID) {
    super(message, 401, code);
  }
}

module.exports = UnauthorizedError;