const path = require("node:path");
const writeFile = require("../utils/writeFile");
const readFile = require("../utils/readFile");
const getId = require("../utils/getId");
const date = require("../utils/date");
const totalAmount = require("../utils/totalAmount");
const orderItems = require("../utils/orderItems");
const decreaseStock = require("../utils/decreaseStock");

function createNewOrder(req, res) {
    try {
        const userId = req.user.id;

        if (userId !== Number(req.params.user_id)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const pathOrders = path.join(__dirname, "../data/orders.json");
        const orders = readFile(pathOrders);

        const pathCarts = path.join(__dirname, "../data/carts.json");
        const carts = readFile(pathCarts);

        const userCart = carts.find(c =>
            c.user_id === userId
        );

        if (!userCart || userCart.items.length === 0) {
            return res.status(404).json({
                message: "User cart is empty"
            });
        }

        const pathProducts = path.join(__dirname, "../data/products.json");
        const products = readFile(pathProducts);
        
        let dataOrder;
        try {
            dataOrder = orderItems(userCart, products);
            decreaseStock(products, userCart);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }

        const newOrder = {
            id: getId(orders),
            user_id: userId,
            order_date: date(),
            total_amount: totalAmount(dataOrder),
            items: dataOrder,
            status: "pending"
        };
        orders.push(newOrder);

        userCart.items = [];
        writeFile(pathCarts, carts);
        writeFile(pathOrders, orders);

        return res.status(201).json({
            message: "Order created",
            order: newOrder
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = createNewOrder;