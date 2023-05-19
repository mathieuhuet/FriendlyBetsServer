const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betDetailsSchema = new Schema({
  user: String,
  bet: String,
  betAt: Number,
  amount: Number,
});

module.exports = betDetailsSchema;