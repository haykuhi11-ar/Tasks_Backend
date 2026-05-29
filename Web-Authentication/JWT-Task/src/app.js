const express = require('express');
const jwt = require('jsonwebtoken');
const router = require('./router');
const error = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use(router);
app.use(error);

module.exports = app;
