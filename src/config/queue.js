const { Queue } = require('bullmq');
const redis = require('./redis');
require('dotenv').config();
const gpsQueue = new Queue('gps', {
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

const alertQueue = new Queue('alerts', {
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

const notificationQueue = new Queue('notifications', {
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
gpsQueue.on('error', (err) => {
  console.error('GPS Queue error:', err);
});
alertQueue.on('error', (err) => {
  console.error('Alert Queue error:', err);
});
notificationQueue.on('error', (err) => {
  console.error('Notification Queue error:', err);
});
module.exports = { gpsQueue, alertQueue, notificationQueue, };