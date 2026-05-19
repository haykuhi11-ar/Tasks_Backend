const path = require("node:path");
const readFile = require("../utils/readFile");
const writeFile = require("../utils/writeFile");

function updateOrderStatus(req, res) {
    try {
        const orderId = Number(req.params.id);

        if (Number.isNaN(orderId)) {
            return res.status(400).json({
                message: "Invalid id"
            });
        }

        const statusOrder = [
            "pending",
            "shipped",
            "delivered",
            "cancelled"
        ]

        const newStatus = req.body.status;

        if (!statusOrder.includes(newStatus)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        if (!newStatus) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const pathOrders = path.join(__dirname, "../data/orders.json");
        const orders = readFile(pathOrders);

        const order = orders.find(o =>
            o.id === orderId
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = newStatus;
        writeFile(pathOrders, orders);

        return res.status(200).json(order);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = updateOrderStatus;