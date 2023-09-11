const secret = require('./secret');
// Needed for access to variable from .env file
require('dotenv').config();
// For accepting post form data
const bodyParser = require('express').json;
// User API
const User = require('./api/user/router');
// Bet API
const Bet = require('./api/bet/router');
// Cors policy
const cors = require("cors");
// Getting local IP
const getLocalIp = require('./utils/getLocalIp');

const ip = getLocalIp();
const app = require('express')();

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(bodyParser());
app.use('/user', User);
app.use('/bet', Bet);

app.listen(secret.PORT, () => {
  console.log(`Server running on port ${secret.PORT}`);
  console.log(`IP = `)
  console.log(ip);
})