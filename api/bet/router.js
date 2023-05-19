const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const makeABet = require('./makeABet');
const joinABet = require('./joinABet');
const getUserBets = require('./getUserBets');
const getBetDetails = require('./getBetDetails');


router.post('/makeABet', authMiddleware, makeABet);
router.post('/joinABet', authMiddleware, joinABet);
router.get('/getUserBets', authMiddleware, getUserBets);
router.post('/getBetDetails', authMiddleware, getBetDetails);


module.exports = router;