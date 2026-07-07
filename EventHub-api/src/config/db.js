const mongoose = require('mongoose');
const env = require('./env');

/**
 * Opens the Mongoose connection and wires up basic lifecycle logging.
 * Called once, at startup, before the HTTP server starts listening —
 * if the database is unreachable we want the process to fail fast
 * instead of accepting requests it can't actually serve.
 */

async function connectDB() {
    mongoose.set('strictQuery', true);

    mongoose.connection.on('connected', () => {
        console.log('[db] mongoose connected')
    });

    mongoose.connection.on('error', (err) => {
        console.error('[db] mongoose connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('[db] mongoose disconnected');
    })

    await mongoose.connect(env.mongoUri, {
        serverSelectionTimeoutMS: 5000
    });

    return mongoose.connection;
}

async function disconnectDB() {
    await mongoose.connection.close();
    console.log('[db] mongoose connection closed');
}

module.exports = { connectDB, disconnectDB };