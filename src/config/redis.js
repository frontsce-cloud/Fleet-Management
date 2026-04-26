const Redis = require('ioredis');
require('dotenv').config();

let redis = null;

try {
  redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    lazyConnect: true, // Don't connect immediately
  });

  redis.on('error', (err) => {
    console.error('Redis connection error:', err.message);
  });

  redis.on('connect', () => {
    console.log('Redis connected successfully');
  });

  redis.on('ready', () => {
    console.log('Redis is ready to receive commands');
  });
} catch (error) {
  console.error('Failed to initialize Redis client:', error.message);
  // Create a dummy client that doesn't throw errors
  redis = {
    on: () => {},
    emit: () => {},
    connected: false,
  };
}

module.exports = redis;