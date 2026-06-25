import db from "../../models/index.js"
import AppError from "../utils/AppError.js"


const {
    Review,
    Orders,
    OrderItems,
    Users
} = db;

export default class ReviewService {
    static async getProducts(productId) {
        return Review.findAll({
            where: {
                product_id: productId
            },
            include: {
                model: Users
            }
        });
    }

    static async create(userId, productId, { rating, comment }) {
        const purchased = await OrderItems.findOne({
            where: {
                product_id: productId
            },
            include: {
                model: Orders,
                where: {
                    user_id: userId
                }
            }
        });

        if (!purchased) {
            throw AppError.forbidden("You can review only purchased product");
        }

        return Review.create({
            user_id: userId,
            product_id: productId,
            rating,
            comment 
        });
    }

    static async remove(reviewId) {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            throw AppError.notFound("Review not found");
        }

        return await review.destroy();
    }
}