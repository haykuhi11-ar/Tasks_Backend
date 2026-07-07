const reviewService = require('../services/review.service');

async function create(req, res) {
    const review = await reviewService.createReview(req.params.eventId, req.user.id, req.body);
    return res.status(201).json(review);
}

async function list(req, res) {
    const result = await reviewService.listReviews(req.params.eventId, req.query);
    return res.status(200).json(result);
}

async function remove(req, res) {
    await reviewService.deleteReview(req.params.reviewId, req.user.id);
    return res.status(204).send();
}

module.exports = {
    create,
    list,
    remove
};