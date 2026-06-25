import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import  AuthController  from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validation } from "../middleware/validate.middleware.js";
import { registerSchema } from "../validations/auth.schema.js";
import { loginSchema } from "../validations/login.schema.js";

const router = express.Router();

router.post("/register", validation(registerSchema), asyncHandler(AuthController.register));
router.post("/login", validation(loginSchema), asyncHandler(AuthController.login));
router.get("/me", authMiddleware, asyncHandler(AuthController.me));

export default router;