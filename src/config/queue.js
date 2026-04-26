const { Queue } = require('bullmq');
const redis = require('./redis');
require('dotenv').config();

let gpsQueue, alertQueue, notificationQueue;

try {
  gpsQueue = new Queue('gps', {
    connection: redis,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });

  alertQueue = new Queue('alerts', {
    connection: redis,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });

  notificationQueue = new Queue('notifications', {
    connection: redis,
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });

  // Set up error handlers
  gpsQueue.on('error', (err) => {
    console.error('GPS Queue error:', err.message);
  });
  alertQueue.on('error', (err) => {
    console.error('Alert Queue error:', err.message);
  });
  notificationQueue.on('error', (err) => {
    console.error('Notification Queue error:', err.message);
  });

} catch (error) {
  console.error('Failed to initialize queues:', error.message);
  // Create dummy queues that don't throw errors
  const dummyQueue = {
    add: () => Promise.resolve(),
    on: () => {},
  };
  gpsQueue = dummyQueue;
  alertQueue = dummyQueue;
  notificationQueue = dummyQueue;
}

module.exports = {
  gpsQueue,
  alertQueue,
  notificationQueue,
};
module.exports = { gpsQueue, alertQueue, notificationQueue, };