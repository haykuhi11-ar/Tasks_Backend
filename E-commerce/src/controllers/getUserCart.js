const path = require("node:path");
const readFile = require("../utils/readFile");

function getUserCart(req, res) {
    try {
        const userId = req.user.id;
        const pathCarts = path.join(__dirname, "../data/carts.json");
        const carts = readFile(pathCarts);
        const cartId = Number(req.params.user_id);

        if (userId !== cartId) {
            return res.status(403).json({
                message: "You can access only your own cart"
            });
        }
        
        const cart = carts.find(c => 
            c.user_id === cartId
        );

        return res.status(200).json(cart || {items: []});
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = getUserCart;