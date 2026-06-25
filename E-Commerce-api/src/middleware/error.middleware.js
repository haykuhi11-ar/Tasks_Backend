import { ValidationError } from "sequelize";
import  AppError  from "../utils/AppError.js"

export const errorMiddleware = (err, req, res, next) => {
    if (err instanceof AppError && err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    if (err instanceof ValidationError) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: err.errors.map(e => e.message)
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
}