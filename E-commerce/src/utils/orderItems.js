function orderItems(cart, products) {
    const itemsOrder = cart.items.map(item => {
        const product = products.find(p =>
            p.id === item.product_id
        );

        if (!product) {
            return null;
        }

        return {
            product_id: product.id,
            quantity: item.quantity,
            price_at_purchase: product.price
        };
    }).filter(item => item !== null);

    return itemsOrder;
}

module.exports = orderItems;