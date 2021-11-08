const RecordsService = require('../services/records.service');
class RecordsController {
  async fetchAll(req, res) {
    const filter = req.body;
    try {
      const result = await RecordsService.fetchAll(filter);
      res.status(200).json(result);
    } catch (err) {
      const statusCode = err.status || err.statusCode || 500;
      const msg = err.message;
      res.status(statusCode).json(msg);
    }
  }
}
module.exports = new RecordsController();
