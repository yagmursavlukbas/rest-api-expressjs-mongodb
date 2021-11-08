const mockingoose = require('mockingoose');
const Records = require('../../../src/models/record.model');
const records = [];
constructAggregationParam = (filter) => {
  [
    {
      $project: {
        _id: false,
        key: true,
        createdAt: true,
        totalCount: { $sum: '$counts' },
      },
    },
    {
      $match: {
        totalCount: { $gte: filter.minCount, $lte: filter.maxCount },
        createdAt: {
          $gte: new Date(filter.startDate),
          $lte: new Date(filter.endDate),
        },
      },
    },
  ];
};
describe('record model', () => {
  const filterObj = {
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
    const results = await Records.aggregate(
      constructAggregationParam(filterObj)
    );
    expect(results).toBeDefined();
  });
});
