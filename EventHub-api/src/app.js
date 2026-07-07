const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./routes/auth.routes');
const eventRouter = require('./routes/event.routes');
const reviewRouter = require('./routes/review.routes');

const notFound = require('./middlewares/notFound.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/events', eventRouter);
app.use('/', reviewRouter);

app.use(notFound);
app.use(errorMiddleware);


module.exports = app;