import CartService from "../services/cart.service.js";

export default class CartController {
    static async getCart(req, res) {
        const userId = req.user.id;

        const cart = await CartService.getCart(userId);
        
        return res.status(200).json({
            success: true,
            cart
        });
    }

    static async addItem(req, res) {
        const userId = req.params.id;
        const { productId, quantity } = req.body;

        const item = await CartService.addCartItem(userId, productId, quantity);

        return res.status(201).json({
            success: true,
            item
        });
    }

    static async updateItem(req, res) {
        const itemId = req.params.id;
        const { quantity } = req.body;

        await CartService.updateCartItem(itemId, quantity);

        return res.status(200).json({
            success: true,
            message: "Item updated"
        });
    }

    static async removeItem(req, res) {
        const itemId = req.params.id;

        await CartService.removeCartItem(itemId);

        return res.status(200).json({
            success: true,
            message: "Item removed"
        });
    }
}