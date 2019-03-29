const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  items: {
    type: Schema.Types.ObjectId,
    ref: 'items'
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  googleID: {
    type: String
  },
  password: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
