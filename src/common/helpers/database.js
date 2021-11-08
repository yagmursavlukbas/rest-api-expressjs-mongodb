const mongoose = require('mongoose');
const { logger } = require('../loggers/logger');

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
    });
    logger.info('DB connection successful!');
  }
};
const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

module.exports = {
  connect,
  disconnect,
};
