require('dotenv').config();

function envConfigs(name, isRequired = true) {
    const value = process.env[name];
    if (value === undefined && isRequired ) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

module.exports = {
    port: Number(envConfigs('PORT', false)) || 4001,
    mongoUri: envConfigs('MONGO_URI'),
    redisUrl: envConfigs('REDIS_URL'),
    accessToken: {
        secretKey: envConfigs('ACCESS_TOKEN_SECRET'),
        ttl: envConfigs('ACCESS_TOKEN_TTL', false) || '15m',
    },
    refreshToken: {
        ttlDays: Number(envConfigs('REFRESH_TOKEN_TTL_DAYS', false)) || 7
    },
    bcryptSaltRounds: Number(envConfigs('BCRYPT_SALT_ROUNDS', false)) || 12
}