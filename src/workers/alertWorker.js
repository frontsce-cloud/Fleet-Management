const { Worker } = require('bullmq');
const { query } = require('../config/database');
const { notificationQueue } = require('../config/queue');
const logger = require('../utils/logger');
const redis = require('../config/redis');

// Alert Worker - only initialize if Redis is available
let alertWorker = null;

if (!redis || redis.status === 'connecting' || !redis.connected) {
  // Redis not available, skip worker initialization
  console.log('Redis not available, skipping Alert worker initialization');
} else {
  try {
    alertWorker = new Worker('alerts', async (job) => {
      const { vehicle_id, type, message, severity } = job.data;

      try {
        logger.info('Creating alert', { vehicle_id, type, severity });

        // Store alert in database
        const result = await query(
          'INSERT INTO alerts (vehicle_id, type, message, severity) VALUES ($1, $2, $3, $4) RETURNING id',
          [vehicle_id, type, message, severity]
        );
        const alertId = result.rows[0].id;

        // Send notification (email, etc.)
        await notificationQueue.add('send-notification', {
          vehicle_id,
          type,
          message,
          severity
        });

        // Broadcast alert via WebSocket
        if (global.wsManager) {
          global.wsManager.broadcast({
            type: 'alert',
            alert_id: alertId,
            vehicle_id,
            alert_type: type,
            message,
            severity
          });
        }

        logger.info('Alert created successfully', { vehicle_id, type });
      } catch (error) {
        logger.error('Error creating alert', { error: error.message, vehicle_id });
        throw error;
      }
    }, {
      connection: redis
    });

    alertWorker.on('completed', (job) => {
      logger.info('Alert job completed', { jobId: job.id });
    });

    alertWorker.on('failed', (job, err) => {
      logger.error('Alert job failed', { jobId: job.id, error: err.message });
    });
  } catch (error) {
    console.error('Failed to initialize Alert worker:', error.message);
  }
}

module.exports = alertWorker;