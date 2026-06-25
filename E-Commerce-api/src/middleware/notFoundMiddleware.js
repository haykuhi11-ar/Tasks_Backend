import AppError from "../utils/AppError.js"

export const notFound = (req, res, next) => {
    next(
        AppError.notFound(
            `Route ${req.originalUrl} not found`
        )
    );
}