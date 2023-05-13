const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betSchema = new Schema({
  admin: String,
  betCode: String,
  createdAt: Number,
  bettingEndAt: Number,
  betResolvedAt: Number,
  betTitle: String,
  betExtraText: String,
});

module.exports = betSchema;