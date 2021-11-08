const winston = require('winston');
const _ = require('lodash');
const { combine, printf, splat, timestamp, uncolorize, colorize } = winston.format;

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    enumerateErrorFormat(),
    timestamp(),
    process.env.NODE_ENV === 'development' ? colorize() : uncolorize(),
    splat(),
    printf((info) => {
        const { timestamp, message, level } = info;
        // convert the message to string if not
        const log = _.isObject(message) ? JSON.stringify(message, null, 2) : message;
        // get the timezone offset
        const offset = new Date(timestamp).toString().match(/(?:GMT)([-+]\d*)/)[1];
        const ts = timestamp.replace("T", " ").replace("Z", "000");
        return `${ts}|${offset}|${level}|${log}`;
      })
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = { logger };