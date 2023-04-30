const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  verified: Boolean,
  accessToken: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;