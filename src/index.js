require('dotenv').config();
const { server, wsManager } = require('./app');
const config = require('./config');
const { createTables } = require('./utils/setupDb');
const logger = require('./utils/logger');

// Start workers
require('./workers/gpsWorker');
require('./workers/alertWorker');
require('./workers/notificationWorker');

// Make wsManager available globally for workers
global.wsManager = wsManager;

const PORT = config.PORT;

async function startServer() {
  try {
    // Try to create database tables (will skip in production if DB not available)
    await createTables();

    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    // In development, exit; in production, Railway will provide services
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    } else {
      // Try to start without DB
      server.listen(PORT, () => {
        logger.warn(`Server running on port ${PORT} without database`);
      });
    }
  }
}

startServer();