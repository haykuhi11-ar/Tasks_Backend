import db from "../../models/index.js"
import AppError from "../utils/AppError.js";

const {
    Orders,
    Carts,
    CartItems,
    Products,
    OrderItems,
    sequelize
} = db;

export default class OrderService {
    static async getAll(user) {
        return Orders.findAll({
            where: { user_id: user.id }
        });
    }

    static async checkout(userId) {
        const transaction = await sequelize.transaction();

        try {
            const cart = await Carts.findOne({
                where: { user_id: userId }
            });

            if (!cart) {
                throw AppError.notFound("Cart not found");
            }

            const cartItems = await CartItems.findAll({
                where: { cart_id: cart.id },
                include: {
                    model: Products
                }
            });

            if (!cartItems.length) {
                throw AppError.badRequest("Cart is empty");
            }

            const order = await Orders.create({
                user_id: userId,
                status: "pending"
            }, { transaction });

            for (const item of cartItems) {

                if (item.Products.stock > item.quantity) {
                    await item.Products.save({
                        transaction
                    });
                } else continue;

                await OrderItems.create({
                    order_id: order.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price_at_purchase: item.Products.price
                }, { transaction });

                item.Products.stock -= item.quantity;
            }

            await CartItems.destroy({
                where: {
                    cart_id: cart.id
                },
                transaction
            });

            await transaction.commit();
            return order;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }

    static async getById(id) {
        const order = await Orders.findByPk(id);

        if (!order) {
            throw AppError.notFound("Order not found");
        }

        return order;
    }

    static async updateStatus(id, status) {
        const order = await Orders.findByPk(id);

        if (!order) {
            throw AppError.notFound("Order not found");
        }

        return order.update({ status });
    }
}