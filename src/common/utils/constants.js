// To be used in response formatting
const ResponseCodes = {
  200: 0,
  400: -1,
  404: -2,
  500: -3,
};
const SUCCESS_MSG = 'Success';
// To be used in request payload validations
const DATE_FORMAT = 'YYYY-MM-DD';
module.exports = { ResponseCodes, SUCCESS_MSG, DATE_FORMAT };
