const { connectDB, disconnectDB } = require("./config/db");
const env = require("./config/env");
const app = require('./app');
const redis = require("./config/redis");

async function start() {
    await connectDB();

    await new Promise((resolve, reject) => {
        if (redis.status === 'ready') return resolve();
        redis.once('ready', resolve);
        redis.once('error', reject);
    });

    const server = app.listen(env.port, () => {
        console.log(`[server] listening on port ${env.port}`);
    });

    const shutdown = async () => {
        console.log('[server] shutting down...');
        server.close();
        await disconnectDB();
        process.exit(0);
    }

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

start().catch((err) => {
    console.error('[server] failed to start:', err);
    process.exit(1);
});