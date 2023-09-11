const secret = require('../secret');
const mongoose = require('mongoose');
const mongoURI = secret.MONGODB_USERBET_URI || 'put your mongoDB URI here'

mongoUserBetDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

module.exports = mongoUserBetDB;