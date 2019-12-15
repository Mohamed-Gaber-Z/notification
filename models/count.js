const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const connection = require('../db/mongoose');

autoIncrement.initialize(connection);

const countSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type: Number,
    ref: 'User',
    required: true
  }
});

countSchema.plugin(autoIncrement.plugin, {
  model: 'Count',
  startAt: '1',
  incrementBy: '1'
});

const Count = mongoose.model('Count', countSchema);

module.exports = Count;
