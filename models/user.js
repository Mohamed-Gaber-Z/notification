const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const autoIncrement = require('mongoose-auto-increment');

const config = require('../config');
const connection = require('../db/mongoose');

autoIncrement.initialize(connection)

const userSchema = new mongoose.Schema({
  nameAr: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 30
  },
  nameEn: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    minlength: 6,
    maxlength: 30
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 11,
    maxlength: 11
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  profileImage: {
    type: String,
    required: true
  },
  location: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 2;
      },
      message: 'array should be two only'
    },
    coordinates: []
  }
});

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  startAt: '1',
  incrementBy: '2'
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, config.secret);
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
