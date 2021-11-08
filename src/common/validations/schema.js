const JoiImport = require('joi');
// necessary extension to validate date input against date format
const DateExtension = require('@joi/date');
const Joi = JoiImport.extend(DateExtension);
const { DATE_FORMAT } = require('../utils/constants');

const schema = {
  body: Joi.object().keys({
    startDate: Joi.date().format(DATE_FORMAT).required(),
    endDate: Joi.date().format(DATE_FORMAT).required(),
    // throws validation error when the input is not in number format
    // also is smaller than zero
    // converts inputs sent as strings to number automatically if it is in valid number format, hence do not throw error
    minCount: Joi.number().min(0).required(),
    // throws validation error when the input is not in number format
    // also is smaller than zero
    // converts inputs sent as strings to number automatically if it is in valid number format, hence do not throw error
    maxCount: Joi.number().min(0).required(),
  }),
};

module.exports = schema;
