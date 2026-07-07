const ApiError = require("./ApiError");
const BadRequestError = require("./BadRequestError");
const ConflictError = require("./ConflictError");
const ForbiddenError = require("./ForbiddenError");
const InternalError = require("./InternalError");
const NotFoundError = require("./NotFoundError");
const UnauthorizedError = require("./UnauthorizedError");

module.exports = {
    ApiError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InternalError
}