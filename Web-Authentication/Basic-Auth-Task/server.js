const express = require("express");
const PORT=3000;
const basicAuth = require("./basicAuth");
const getItems = require("./getItems");
const app = express();

app.use(express.json());

app.get('/home', (req, res) => {
    return res.status(200).send('This is a public route');
});

app.get('/welcome', basicAuth, (req, res) => {
    return res.status(200).send(`Welcome ${req.user.username}`);
});

app.get('/items', basicAuth, getItems);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});