// Needed for access to variable from .env file
require('dotenv').config();
// Our mongoDB Database
require('./config/db');
// For accepting post form data
const bodyParser = require('express').json;
// User API
const User = require('./api/userAPI');
// Cors policy
const cors = require("cors");


const app = require('express')();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser());
app.use('/user', User);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})