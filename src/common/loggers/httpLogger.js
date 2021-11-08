const morgan = require('morgan');
const json = require('morgan-json');
const { logger } = require('./logger');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const format = json({
  consumer: ':remote-addr',
  method: ':method',
  url: ':url',
  status: ':status',
  message: ':message',
  contentLength: ':res[content-length]',
  responseTime: ':response-time',
});

const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const { status } = JSON.parse(message);
      const statusCode = Number.parseInt(status);
      if (statusCode >= 400 && statusCode <= 500) {
        return logger.error(message.trim());
      }
      return logger.info(message.trim());
    },
  },
});

module.exports = httpLogger;
