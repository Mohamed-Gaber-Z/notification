const mongoose = require('mongoose');

const shopShema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  }
});

const Shop = mongoose.model('Shop', shopShema);

module.exports = Shop;
