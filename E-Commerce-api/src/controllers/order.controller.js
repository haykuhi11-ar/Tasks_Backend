import OrderService from "../services/order.service.js";

export default class OrderController {
    static async checkout(req, res) {
        const userId = req.user.id;
        const order = await OrderService.checkout(userId);

        return res.status(201).json({
            success: true,
            order
        });
    }

    static async getAll(req, res) {
        const user = req.user;
        const orders = await OrderService.getAll(user);

        return res.status(200).json({
            success: true,
            orders
        })
    }

    static async getById(req, res) {
        const id = req.params.id;
        const order = await OrderService.getById(id);

        return res.status(200).json({
            success: true,
            order
        });
    }

    static async updateStatus(req, res) {
        const id = req.params.id;
        const { status } = req.body;

        await OrderService.updateStatus(id, status);

        return res.status(200).json({
            success: true,
            message: "Order status updated"
        });
    }
}