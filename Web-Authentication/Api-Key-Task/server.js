const express = require("express");
const apiPermission = require("./apiPermission");
const { apiKeyAuth } = require("./apiKeyAuth");
const app = express();
const PORT = 3000;


app.use(express.json());

app.get('/status', (req, res) => {
    res.send('Server is running');
});

app.get('/products', apiKeyAuth, apiPermission('read'), (req, res) => {
    return res.json([
        { id: 1, name: 'Laptop' },
        { id: 2, name: 'Phone' }
    ]);
});

app.post('/products', apiKeyAuth, apiPermission('write'), (req, res) => {
    const newProduct = req.body;
    newProduct.id = Math.floor(Math.random() * 1000);

    return res.json(newProduct);
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});