const AppError = require('../errors/error.js');
const _ = require("lodash");
const joi = require('joi');
// validate request payload against the given schema e.g. filter.validation
const validate = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ['params', 'query', 'body']);
  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new AppError(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};
module.exports = validate;