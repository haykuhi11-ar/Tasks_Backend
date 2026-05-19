const readFile = require("../utils/readFile");
const path = require("node:path");

function getOrder(req, res) {
    try {
        const pathOrders = path.join(__dirname, "../data/orders.json");
        const orders = readFile(pathOrders);
        const userId = req.user.id;

        if (userId !== Number(req.params.user_id)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const userOrders = orders.filter(order => 
            order.user_id === userId
        );

        if (!userOrders.length) {
            return res.status(404).json({
                message: "Orders not found"
            });
        }

        return res.status(200).json(userOrders);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = getOrder;