const { ResponseCodes, SUCCESS_MSG } = require('../utils/constants');
const modifyRes = require('modify-response-middleware')
module.exports = modifyRes((content, req, res) => {
    const resp = {
        code: ResponseCodes[res.statusCode],
        msg: res.statusCode === 200 ? SUCCESS_MSG : res.message || res.statusMessage || JSON.parse(content.toString()),
        ...(content && res.statusCode === 200 && { records: JSON.parse(content.toString())}),
    };
    return Buffer.from(JSON.stringify(resp));
  }, {
    noCache: true, // set request header "cache-control: no-cache", which avoids 304 responses
  });
