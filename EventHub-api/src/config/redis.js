const Redis = require('ioredis');
const env = require('./env');

const redis = new Redis(env.redisUrl, {
    maxRetriesPerRequest: null,
    tls: {},
});

redis.on('connect', () => console.log('[redis] connected'));
redis.on('error', (error) => console.error('[redis] error:', error.message));

module.exports = redis;