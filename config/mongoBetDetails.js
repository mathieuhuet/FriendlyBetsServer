const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_BETDETAILS_URI || 'put your mongoDB URI here'

mongoBetDetailsDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

module.exports = mongoBetDetailsDB;