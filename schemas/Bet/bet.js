const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betSchema = new Schema({
  admin: String,
  bet: String,
  betExplain: String,
  betCode: String,
  createdAt: Number,
  bettingEndAt: Number,
  betResolvedAt: Number,
  betTitle: String,
  betExtraText: String,
  participants: [String]
});

module.exports = betSchema;