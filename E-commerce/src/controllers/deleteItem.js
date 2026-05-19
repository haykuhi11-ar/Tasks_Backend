const path = require("node:path");
const readFileCarts = require("../utils/readFile");
const writeFileCarts = require("../utils/writeFile");

function deleteItem(req, res) {
    try {
        const userId = req.user.id;

        if (userId !== Number(req.params.user_id)) {
            return res.status(403).json({
                message: "You can only delete your own cart"
            });
        }

        const product_id = Number(req.params.product_id);

        const pathCarts = path.join(__dirname, "../data/carts.json");
        const carts = readFileCarts(pathCarts);

        const cart = carts.find(c =>
            c.user_id === userId
        );

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(i =>
            i.product_id !== product_id
        );

        writeFileCarts(pathCarts, carts);

        return res.status(204).send();

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = deleteItem;