const path = require("node:path");
const readFileCarts = require("../utils/readFile");
const writeFileCarts = require("../utils/writeFile");

function addProduct(req, res) {
    try {
        const userId = req.user.id;

        if (userId !== Number(req.params.user_id)) {
            return res.status(403).json({
                message: "You can only modify your own cart"
            });
        }

        const { product_id, quantity } = req.body;

        const pathCarts = path.join(__dirname, "../data/carts.json");
        const carts = readFileCarts(pathCarts);

        const cart = carts.find(c =>
            c.user_id === userId
        );

        if (!cart) {
            cart = {
                user_id: userId,
                items: []
            };
            carts.push(cart);
        }

        const item = cart.items.find(i =>
            i.product_id === product_id
        );

        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.push({
                product_id,
                quantity
            });
        }
        writeFileCarts(pathCarts, carts);

        return res.status(200).json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = addProduct;