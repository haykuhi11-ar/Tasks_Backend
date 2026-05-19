const path = require("node:path");
const writeFileProduct = require("../utils/writeFile");
const readFileProducts = require("../utils/readFile");
const getNewId = require("../utils/getId");

function createNewProduct(req, res) {
    try {
        const pathProduct = path.join(__dirname, "../data/products.json");
        const products = readFileProducts(pathProduct);
        const newId = getNewId(products);

        const {name, description, price, stock_quantity} = req.body;

        const product = products.find(p => 
            p.name === name
        );

        if (product) {
            return res.status(400).json({
                message: "Product already exists"
            });
        }

        price = Number(price);
        stock_quantity = Number(stock_quantity);

        const newProduct = {
            id: newId,
            name,
            description,
            price,
            stock_quantity
        }
        products.push(newProduct);
        writeFileProduct(pathProduct, products);

        return res.status(201).json({
            message: "Product created successfully"
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = createNewProduct;