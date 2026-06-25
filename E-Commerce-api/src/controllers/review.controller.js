import ReviewService from "../services/review.service.js";


export default class ReviewController {
    static async getByProduct(req, res) {
        const productId = req.params.id;

        const reviews = await ReviewService.getProducts(productId);

        return res.status(200).json({
            success: true,
            reviews
        });
    }

    static async createReview(req, res) {
        const userId = req.user.id;
        const productId = req.params.id;
        const review = await ReviewService.create(
            userId,
            productId,
            req.body
        );

        return res.status(201).json({
            success: true,
            review
        });
    }

    static async removeReview(req, res) {
        const reviewId = req.params.id;

        await ReviewService.remove(reviewId);

        return res.status(200).json({
            success: true,
            message: "Review deleted"
        });
    }
}