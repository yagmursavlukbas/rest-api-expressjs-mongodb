const AppError = require('../errors/error');
const { logger } = require('../loggers/logger');
const logError = (err) => {
    logger.error(err);
};
   
const logErrorMiddleware = (err, req, res, next) => {
    logError(err)
    next(err)
};
   
const returnError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message);
};
   
const isOperationalError = (error) => {
    if (error instanceof AppError) {
        return error.isOperational
    }
    return false
};
module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    isOperationalError,
};