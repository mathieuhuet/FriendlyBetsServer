const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBetSchema = new Schema({
  _id: Schema.Types.ObjectId,
  admin: String,
  bet: String,
  betCode: String,
  joinedAt: Number,
});

module.exports = userBetSchema;