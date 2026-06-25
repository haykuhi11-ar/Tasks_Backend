export default class AppError extends Error {
    constructor(message, statusCode, errors = null) {
        super(message);

        this.message = message;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.errors = errors;
        this.success = false;
        this.isOperational = true;
        this.timestamp = new Date().toISOString();

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = 'Bad request', errors = null) {
        return new AppError(message, 400, errors);
    }

    static unauthorized(message = 'Unauthorized') {
        return new AppError(message, 401);
    }

    static forbidden(message = 'Forbidden') {
        return new AppError(message, 403);
    }

    static notFound(message = 'Resource not found') {
        return new AppError(message, 404);
    }

    static conflict(message = 'Conflict') {
        return new AppError(message, 409);
    }

    static validation(message = "Validation failed", errors = []) {
        return new AppError(message, 422, errors);
    }

    static internal(message = 'Internal server error') {
        return new AppError(message, 500);
    }
}
