const router = require('express').Router();

const login = require('./login');
const register = require('./register');
const verify = require('./verify');


router.post('/login', login);
router.post('/register', register);
router.post("/verify", verify);

module.exports = router;
