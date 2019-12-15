const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const connection = require('../db/mongoose');

autoIncrement.initialize(connection);

const notificationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  },
  user: {
    type: Number,
    ref: 'User',
    required: true
  }
});

notificationSchema.plugin(autoIncrement.plugin, {
  model: 'Notification',
  startAt: '2',
  incrementBy: '2'
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
