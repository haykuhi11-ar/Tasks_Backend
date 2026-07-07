const redis = require('ioredis');
const env = require('./env');

const redis = new redis.Redis(env.redisUrl, {
    maxRetriesPerRequest: 3,
    lazyConnect: false
});

redis.on('connect', () => console.log('[redis] connected'));
redis.on('error', (error) => console.error('[redis] error:', error.message));

module.exports = redis;