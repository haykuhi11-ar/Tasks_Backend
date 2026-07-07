const redis = require('../config/redis');
const CACHE_PREFIX = 'refresh:';

/**
 * Thin caching layer in front of the RefreshToken collection in MongoDB.
 * MongoDB remains the source of truth (it's what we inspect via mongosh
 * and what stores full history for reuse-detection); Redis just avoids
 * hitting Mongo on every /auth/refresh call by caching "is this token
 * hash currently active, and for which user?".
 *
 * Cache-aside pattern:
 *   - on read: check Redis first, fall back to Mongo on miss, then populate Redis
 *   - on write (rotate/revoke): update Mongo first (source of truth),
 *     then invalidate/update Redis
 */

function cacheKey(tokenHash) {
    return `${CACHE_PREFIX}${tokenHash}`
}

async function get(tokenHash) {
    const cached = await redis.get(cacheKey(tokenHash));
    return cached ? JSON.parse(cached) : null;
}

async function set(tokenHash, userId, ttlseconds) {
    await redis.set(cacheKey(tokenHash), JSON.stringify({ userId }), 'EX', ttlseconds);
}

async function invalidate(tokenHash) {
    await redis.del(cacheKey(tokenHash));
}

module.exports = {
    get,
    set,
    invalidate
}