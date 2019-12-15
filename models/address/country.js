const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  country:{
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  cityref:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
