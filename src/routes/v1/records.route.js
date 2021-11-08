const express = require('express');
const RecordsController = require('../../controllers/records.controller');
const validate = require('../../common/validations/validate');
const schema = require('../../common/validations/schema');
const router = express.Router();
router.route('/records').post(validate(schema), RecordsController.fetchAll);

module.exports = router;
