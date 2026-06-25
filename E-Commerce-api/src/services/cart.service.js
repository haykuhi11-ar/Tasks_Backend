import db from "../../models/index.js";
import AppError from "../utils/AppError.js";

const { 
    Carts,
    CartItems,
    Products
} = db;

export default class CartService {
    static async getCart(userId) {
        return Carts.findOne({
            where: { user_id: userId.id },
            include: {
                model: CartItems,
                include: Products
            }
        });
    }

    static async addCartItem(userId, productId, quantity) {
        const cart = await Carts.findOne({
            where: { user_id: userId }
        });

        const product = await Products.findByPk(productId);

        if (!product) {
            throw AppError.notFound("Product not found")
        }

        const item = await CartItems.findOne({
            where: {
                cart_id: cart.id,
                product_id: product.id
            }
        });

        if (item) {
            item.quantity += quantity;
            await item.save();
            return item;
        }

        return CartItems.create({
            cart_id: cart.id,
            product_id: product.id,
            quantity
        });
    }

    static async updateCartItem(itemId, quantity) {
        const item = await CartItems.findByPk(itemId);

        if (!item) {
            throw AppError.notFound("Cart not found");
        }

        item.quantity = quantity;
        return item.save();
    }

    static async removeCartItem(itemId) {
        const item = await CartItems.findByPk(itemId);

        if (!item) {
            throw AppError.notFound("Cart item not found");
        }

        return item.destroy();
    }
}