const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {
  logError,
  isOperationalError,
} = require('./src/common/middlewares/error.handler');
const { logger } = require('./src/common/loggers/logger');
dotenv.config();
const app = require('./app');

app.set('port', (process.env.PORT || 5000));
const server = app.listen(port, () => {
  logger.info(`App running on port ${port}...`);
});
// global exceptions handling
process.on('uncaughtException', (err) => {
  logError(err);
  if ((process.env.NODE_ENV = 'development')) {
    logError(err.stack);
  }
  if (!isOperationalError(err)) {
    process.exit(1);
  }
});
process.on('unhandledRejection', (err) => {
  logError(err);
  server.close(() => {
    process.exit(1);
  });
});
process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated!');
  });
});

module.exports = app;
