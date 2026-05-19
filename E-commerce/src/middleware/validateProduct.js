function validateProduct(req, res, next) {
    const {
        name, 
        description, 
        price, 
        stock_quantity
    } = req.body;
    
    price = Number(price);
    stock_quantity = Number(stock_quantity);
    
    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    if (!description) {
        return res.status(400).json({
            message: "Description is required"
        });
    }

    if (Number.isNaN(price) || price < 1) {
        return res.status(400).json({
            message: "invalid price (price must be > 0)"
        });
    }

    if (Number.isNaN(stock_quantity) || stock_quantity < 0) {
        return res.status(400).json({
            message: "invalid stock quantity"
        });
    }

    next();
}

module.exports = validateProduct;