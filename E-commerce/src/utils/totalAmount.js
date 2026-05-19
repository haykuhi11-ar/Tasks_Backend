function totalAmount(orderItems) {
    const total = orderItems.reduce((sum, item) => {
        return sum + item.quantity * item.price_at_purchase;
    }, 0);
    return total;
}

module.exports = totalAmount;