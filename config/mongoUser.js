const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_USER_URI || 'put your mongoDB URI here'

mongoUserDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });


module.exports = mongoUserDB;