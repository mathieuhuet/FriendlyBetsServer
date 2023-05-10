const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const makeABet = require('./makeABet');




router.post('/makeABet',authMiddleware, makeABet);


module.exports = router;