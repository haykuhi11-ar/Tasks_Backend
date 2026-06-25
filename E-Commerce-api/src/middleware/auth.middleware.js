import  AppError  from "../utils/AppError.js";
import { verifyToken } from "../utils/token.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.JWT_SECRET;

    if (!authHeader) {
        throw AppError.unauthorized("No token provided");
    }

    const [ type, token ] = authHeader.split(" ");

    if (!token || type !== "Bearer") {
        throw AppError.unauthorized("Invalid token format");
    }

    const decoded = verifyToken({ token, secretKey });

    if (!decoded) {
        throw AppError.unauthorized("Invalid or expired token")
    }
    
    req.user = decoded;
    next();
}