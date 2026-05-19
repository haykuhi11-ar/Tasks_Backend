const path = require("node:path");
const readFileProducts = require("../utils/readFile");

function getProductsById(req, res) {
    try {
        const pathProducts = path.join(__dirname, "../data/products.json");
        const products = readFileProducts(pathProducts);
        const id = Number(req.params.id);

        const product = products.find(p =>
            p.id === id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = getProductsById;