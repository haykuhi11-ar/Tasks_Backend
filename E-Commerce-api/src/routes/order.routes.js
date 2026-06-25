import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import OrderController from "../controllers/order.controller.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/checkout", authMiddleware, asyncHandler(OrderController.checkout));
router.get("/", authMiddleware, asyncHandler(OrderController.getAll));
router.get("/:id", authMiddleware, asyncHandler(OrderController.getById));
router.patch("/:id/status", authMiddleware, adminMiddleware, asyncHandler(OrderController.updateStatus));

export default router;