const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  imageURL: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

const Items = mongoose.model('items', ItemsSchema);

module.exports = Items;
