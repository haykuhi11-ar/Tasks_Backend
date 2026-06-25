import  AppError  from "../utils/AppError.js"

export const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        throw AppError.unauthorized("Not authenticated");
    }

    if (req.user.role !== "admin") {
        throw AppError.forbidden("Admin only");
    }

    next();
}