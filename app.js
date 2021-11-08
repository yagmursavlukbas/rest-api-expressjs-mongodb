require('dotenv').config();
const router = require('./src/routes/v1/records.route');
const mongoSanitize = require('express-mongo-sanitize');
const responseHandler = require('./src/common/middlewares/response.handler');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const httpLogger = require('./src/common/loggers/httpLogger');
const { returnError } = require('./src/common/middlewares/error.handler');
const AppError = require('./src/common/errors/error');
const databaseHelper = require('./src/common/helpers/database');

class App {
  constructor() {
    this.express = express();
    this.database();
    this.errorHandlers();
    this.middlewares();
    this.routes();
  }

  database() {
    if (process.env.NODE_ENV !== 'test') {
      databaseHelper.connect();
    }
  }

  middlewares() {
    // Middleware uses morgan
    this.express.use(httpLogger);
    // Implement CORS
    this.express.use(cors());
    this.express.options('*', cors());
    // Set security HTTP headers
    this.express.use(helmet());
    this.express.use(express.json());
    // Data sanitization against NoSQL query injection
    this.express.use(mongoSanitize());
    // set default content type to application/json to avoid xss
    this.express.use(function (req, res, next) {
      res.setHeader('Content-Type', 'application/json');
      next();
    });
    // middleware that formats to response before sending to client
    this.express.use(responseHandler);
  }

  routes() {
    // ROUTES
    // changed from /api/v1 to ease testing in prod
    this.express.use('/api/v1', router);
    // default routing for undefined resources
    this.express.all('*', (req, res, next) => {
      res.contentType('application/json');
      next(
        new AppError(404, `Can't find '${req.originalUrl}' on this server!`)
      );
    });
  }
  errorHandlers() {
    // error handler completing the response
    this.express.use(returnError);
  }
}

module.exports = new App().express;
