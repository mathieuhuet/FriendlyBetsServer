const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBetSchema = new Schema({
  _id: Schema.Types.ObjectId,
  admin: String,
  bet: String,
  betExplain: String,
  betCode: String,
  createdAt: Number,
  bettingEndAt: Number,
  betResolvedAt: Number,
  betTitle: String,
  betExtraText: String,
});

module.exports = userBetSchema;