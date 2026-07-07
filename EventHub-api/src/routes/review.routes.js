const express = require('express');
const router = express.Router();

const asyncHandler = require('../utils/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const reviewController = require('../controllers/review.controller');
const { 
    listReviewQuerySchema, 
    createReviewSchema,
    reviewIdParamSchema
} = require('../validations/review.validations');

// Public — anyone can read reviews.
router.get('/events/:eventId/reviews', validate(listReviewQuerySchema), asyncHandler(reviewController.list));

// Authenticated — must have attended the event (checked in the service).
router.post('/events/:eventId/reviews', authMiddleware, validate(createReviewSchema), asyncHandler(reviewController.create));
router.delete('/reviews/:reviewId', authMiddleware, validate(reviewIdParamSchema), asyncHandler(reviewController.remove));

module.exports = router;