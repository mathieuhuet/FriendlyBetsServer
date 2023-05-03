const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  profileIconColor: String,
  profileIconBackgroundColor: String,
  profileIconPolice: String,
  verified: Boolean,
  online: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;