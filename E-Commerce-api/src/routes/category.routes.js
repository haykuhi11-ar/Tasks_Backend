import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import CategoryController from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { validation } from "../middleware/validate.middleware.js";
import { categorySchema } from "../validations/category.schema.js";

const router = express.Router();

router.get("/", asyncHandler(CategoryController.getAll));
router.post("/", authMiddleware, adminMiddleware, validation(categorySchema), asyncHandler(CategoryController.create));
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(CategoryController.remove));

export default router;