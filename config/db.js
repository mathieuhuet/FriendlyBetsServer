const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'put your mongoDB URI here'

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Database. <3');
  })
  .catch((err) => console.log(err));