const path = require("node:path");
const readFileProducts = require("../utils/readFile");
const writeFileProduct = require("../utils/writeFile");

function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const pathProduct = path.join(__dirname, "../data/products.json");
        const products = readFileProducts(pathProduct);

        const productIdx = products.findIndex(p => 
            p.id === id
        );

        if (productIdx === -1) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        products[productIdx] = {
            ...products[productIdx],
            ...req.body
        };

        writeFileProduct(pathProduct, products);
        return res.status(200).json({
            message: "Product update successfully",
            data: products[productIdx]
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = updateProduct;