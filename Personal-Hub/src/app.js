const cookieParser = require('cookie-parser');
const express = require('express');
const router = require('./routes/index');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorMiddleware = require('./middlewares/error.midleware');

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;