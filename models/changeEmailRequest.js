const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changeEmailRequestSchema = new Schema({
  prevEmail: String,
  newEmail: String,
  loginCode: String,
  createdAt: Number,
  expiresAt: Number,
});

const ChangeEmailRequest = mongoose.model('ChangeEmailRequest', changeEmailRequestSchema);

module.exports = ChangeEmailRequest;