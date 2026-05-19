const path = require("node:path");
const readFileProducts = require("../utils/readFile");
const writeFileProduct = require("../utils/writeFile");

function deleteProduct(req, res) {
    try {
        const pathProduct = path.join(__dirname, "../data/products.json");
        const products = readFileProducts(pathProduct);

        const id = Number(req.params.id);

        if (id === null || Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid id"
            });
        }

        const product = products.find(p => 
            p.id === id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const filteredProducts = products.filter(p => 
            p.id !== id
        );

        writeFileProduct(pathProduct, filteredProducts);
        return res.status(204).send();

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = deleteProduct;