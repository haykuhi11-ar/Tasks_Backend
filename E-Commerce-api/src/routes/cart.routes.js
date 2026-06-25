import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CartController from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", authMiddleware, asyncHandler(CartController.getCart));
router.post("/items", authMiddleware, asyncHandler(CartController.addItem));
router.put("/items/:id", authMiddleware, asyncHandler(CartController.updateItem));
router.delete("/items/:id", authMiddleware, asyncHandler(CartController.removeItem));

export default router;