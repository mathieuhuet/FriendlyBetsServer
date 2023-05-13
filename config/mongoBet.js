const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_USER_URI || 'put your mongoDB URI here'

mongoBetDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

module.exports = mongoBetDB;