const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const routerUsers = require("./src/routes/users");
const routerProducts = require("./src/routes/products");
const routerCarts = require("./src/routes/carts");
const routerOrder = require("./src/routes/orders");
const app = express();

app.use(express.json());
app.use('/api/users',routerUsers);
app.use('/api/products', routerProducts);
app.use('/api/cart', routerCarts);
app.use('/api/orders', routerOrder);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});