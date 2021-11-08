const mongoose = require('mongoose');
const recordSchema = mongoose.Schema({});
const Record = mongoose.model('Record', recordSchema, 'records');
module.exports = Record;