const RecordsController = require('../../../src/controllers/records.controller');
const RecordsService = require('../../../src/services/records.service');
const { mockRequest, mockResponse } = require('../../mocks/requestResponse');
jest.mock('../../../src/services/records.service');
const records = [];
describe('records controller', () => {
  let recordsServiceSpy;
  let res, req;
  beforeAll(() => {
    recordsServiceSpy = jest.spyOn(RecordsService, 'fetchAll');
    res = mockResponse();
    req = mockRequest();
  });
  it('throw error with status code 400 in case of an invalid request payload', async () => {
    recordsServiceSpy.mockResolvedValueOnce(records);
    await RecordsController.fetchAll(req, res);
    expect(recordsServiceSpy).toHaveBeenCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(records);
  });
});
