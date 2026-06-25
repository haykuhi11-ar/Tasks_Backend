import express from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import ProductController from "../controllers/product.controller.js";
import { validation } from "../middleware/validate.middleware.js";
import { ProductSchema } from "../validations/product.schema.js";

const router = express.Router();

router.get("/", asyncHandler(ProductController.getAll));
router.get("/:id", asyncHandler(ProductController.getById) );
router.post("/", authMiddleware, adminMiddleware, validation(ProductSchema), asyncHandler(ProductController.create));
router.put("/:id",authMiddleware, adminMiddleware, asyncHandler(ProductController.update) );
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(ProductController.remove));

export default router;