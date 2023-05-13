const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_USERBET_URI || 'put your mongoDB URI here'

mongoUserBetDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

module.exports = mongoUserBetDB;