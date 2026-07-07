const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            trim: true,
            maxlength: 1000
        },
    }, { timestamps: true }
);

// One review per user per event, enforced at the database level.

reviewSchema.index({ user: 1, event: 1 }, { unique: true });

// Supports "all reviews for event X, newest first" for event detail pages.

reviewSchema.index({ event: 1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);