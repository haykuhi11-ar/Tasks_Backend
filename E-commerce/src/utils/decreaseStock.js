function decreaseStock(products, userCart) {
    
    userCart.items.forEach(item => {
        const product = products.find(p =>
            p.id === item.product_id
        );

        if (product && product.stock_quantity >= item.quantity) {
            product.stock_quantity -= item.quantity;
        } else {
            return;
        }
    });
    return products;
}

module.exports = decreaseStock;