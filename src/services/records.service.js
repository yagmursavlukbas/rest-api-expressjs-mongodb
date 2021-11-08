const { AppError } = require('../common/errors/error');
const Record = require('../models/record.model');
class RecordsService {
  getAggregateFilter(filter) {
    return [
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
  }
  async fetchAll(filter) {
    const filterQuery = this.getAggregateFilter(filter);
    try {
      return Record.aggregate(filterQuery);
    } catch (err) {
      const message = err.message || err.reason;
      const statusCode = err.statusCode || 500;
      throw new AppError(statusCode, message);
    }
  }
}
module.exports = new RecordsService();
