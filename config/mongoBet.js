const secret = require('../secret');
const mongoose = require('mongoose');
const mongoURI = secret.MONGODB_BET_URI || 'put your mongoDB URI here'

mongoBetDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

module.exports = mongoBetDB;