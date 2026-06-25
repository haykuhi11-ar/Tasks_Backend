import AppError from "../utils/AppError.js";

export const validation = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }));

            return next( AppError.validation(errors));
        }

        req.body = result.data;
        next();
    }
}