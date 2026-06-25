import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import ReviewController from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/products/:id/reviews", asyncHandler(ReviewController.getByProduct));
router.post("/products/:id/reviews", authMiddleware, asyncHandler(ReviewController.createReview));
router.delete("/reviews/:id", authMiddleware, asyncHandler(ReviewController.removeReview));

export default router;