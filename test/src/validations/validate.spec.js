const {
  mockRequest,
  mockResponse,
  mockNext,
} = require('../../mocks/requestResponse');
const schema = require('../../../src/common/validations/schema');
const validate = require('../../../src/common/validations/validate')(schema);

describe('validate', () => {
  let recordsServiceSpy;
  let res, req;
  beforeAll(() => {
    res = mockResponse();
    req = mockRequest();
    next = mockNext();
  });
  it('should call next middleware', () => {
    const requestPayload = {
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000,
    };
    req.body = requestPayload;
    validate(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
