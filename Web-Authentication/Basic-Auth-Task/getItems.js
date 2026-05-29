function getItems(req, res) {
    const items = [
        { id: 1, name: "Laptop", price: 1200 },
        { id: 2, name: "Smartphone", price: 800 },
        { id: 3, name: "Headphones", price: 150 },
        { id: 4, name: "Backpack", price: 60 },
        { id: 5, name: "Notebook", price: 5 }
    ];
    return res.status(200).json(items);
}

module.exports = getItems;



