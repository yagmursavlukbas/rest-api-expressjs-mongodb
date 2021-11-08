const mockingoose = require('mockingoose');
const RecordsService = require('../../../src/services/records.service');
const Records = require('../../../src/models/record.model');
const AppError = require('../../../src/common/errors/error');
const records = [];
describe('records service', () => {
  const reqPayload = {
    startDate: '2016-01-26',
    endDate: '2018-02-02',
    minCount: 2700,
    maxCount: 3000,
  };
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });
  it('should return records aggregated', async () => {
    mockingoose(Records).toReturn(records, 'aggregate');
    const result = await RecordsService.fetchAll(reqPayload);
    expect(result).toBeDefined();
  });
  it('should throw error when the model throws an error', async () => {
    const message = 'The filter is invalid!';
    mockingoose(Records).toReturn(new Error(message), 'aggregate');
    expect(() => {
      RecordsService.fetchAll(reqPayload).toThrow(new AppError(500, message));
    });
  });
});
