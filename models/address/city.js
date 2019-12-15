const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city:{
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  }
});

const City = mongoose.model('City', citySchema);

module.exports = City;
