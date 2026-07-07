const mongoose = require('mongoose');
const Review = require('../models/Review');
const eventService = require('./event.service');
const attendanceService = require('./attendance.service');
const { ForbiddenError, ConflictError, NotFoundError } = require('../errors');
const ERROR_CODES = require('../errors/error.codes');

async function createReview(eventId, userId, { rating, comment }) {
    await eventService.getEventOrThrow(eventId);

    const attended = await attendanceService.hasAttended(eventId, userId);
    if (!attended) {
        throw new ForbiddenError(
            'You can only review an event you attended after it has ended',
            ERROR_CODES.NOT_ATTENDED
        );
    }

    try {
        const review = await Review.create({ event: eventId, user: userId, rating, comment });
        return review;
    } catch (error) {
        if (error.code === 11000) {
            throw new ConflictError('You have already reviewed this event', ERROR_CODES.REVIEW_ALREADY_EXISTS);
        }
        throw error;
    }
}

async function listReviews(eventId, { page, limit }) {
    await eventService.getEventOrThrow(eventId);

    const skip = (page - 1) * limit;

    const [items, total, ratingAgg] = await Promise.all([
        Review.find({ event: eventId })
            .populate('user', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Review.countDocuments({ event: eventId }),
        Review.aggregate([
            { $match: { event: new mongoose.Types.ObjectId(eventId) } },
            { $group: { _id: null, averageRating: { $avg: '$rating' }, count: { $sum: 1 } } },
        ])
    ]);

    const summary = ratingAgg[0]
        ? { averageRating: Math.round(ratingAgg[0].averageRating * 10) / 10, count: ratingAgg[0].count }
        : { averageRating: null, count: 0 };

    return {
        items,
        summary,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
}

async function deleteReview(reviewId, userId) {
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new NotFoundError('Review not found', ERROR_CODES.REVIEW_NOT_FOUND);
    }

    if (!review.user.equals(userId)) {
        throw new ForbiddenError(
            'You can only delete your own review',
            ERROR_CODES.NOT_REVIEW_OWNER
        );
    }
    await review.deleteOne();
}

module.exports = {
    createReview,
    listReviews,
    deleteReview
}