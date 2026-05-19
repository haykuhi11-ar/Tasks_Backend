const path = require("node:path");
const readFile = require("../utils/readFile");

function getOrderById(req, res) {
    try {
        const pathOrders = path.join(__dirname, "../data/orders.json");
        const orders = readFile(pathOrders);

        const orderId = Number(req.params.id);

        if (Number.isNaN(orderId)) {
            return res.status(400).json({
                message: "Invalid id"
            });
        }

        const order = orders.find(o =>
            o.id === orderId
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (req.user.id !== order.user_id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        return res.status(200).json(order);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = getOrderById;