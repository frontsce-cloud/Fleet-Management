const Redis = require('ioredis');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL;
const disableRedis = process.env.DISABLE_REDIS === 'true';
let redis = null;

if (disableRedis) {
  console.warn('⚠️ Skipping Redis because DISABLE_REDIS=true. Redis features are disabled.');
} else if (!redisUrl) {
  console.warn('⚠️ Skipping Redis: REDIS_URL is not configured. Redis features are disabled.');
} else {
  redis = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
  });

  redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err.message);
    process.exit(1);
  });

  redis.on('connect', () => {
    console.log('✅ Redis connected');
  });

  redis.on('ready', () => {
    console.log('✅ Redis ready');
  });
}

// Function to wait for Redis connection
const waitForRedis = async () => {
  if (!redis) {
    return null;
  }

  return new Promise((resolve, reject) => {
    if (redis.status === 'ready') {
      resolve(redis);
      return;
    }

    const timeout = setTimeout(() => {
      reject(new Error('Redis connection timeout'));
    }, 30000); // 30 seconds timeout

    redis.once('ready', () => {
      clearTimeout(timeout);
      resolve(redis);
    });

    redis.once('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
};

module.exports = { redis, waitForRedis };
