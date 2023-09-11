const secret = require('../secret');
const mongoose = require('mongoose');
const mongoURI = secret.MONGODB_BETDETAILS_URI || 'put your mongoDB URI here'

mongoBetDetailsDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

module.exports = mongoBetDetailsDB;