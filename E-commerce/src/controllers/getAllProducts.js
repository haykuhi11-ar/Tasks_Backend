const path = require("node:path");
const readFileProducts = require("../utils/readFile");

function getAllProducts(req, res) {
    try {
        const pathProducts = path.join(__dirname, "../data/products.json");
        const products = readFileProducts(pathProducts);

        return res.status(200).json(products);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = getAllProducts;