const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const makeABet = require('./makeABet');
const joinABet = require('./joinABet');
const getUserBets = require('./getUserBets');
const getBetDetails = require('./getBetDetails');
const deleteABet = require('./deleteABet');
const quitABet = require('./quitABet');
const getParticipants = require('./getParticipants');
const checkJoinABet = require('./checkJoinABet');


router.post('/makeABet', authMiddleware, makeABet);
router.post('/joinABet', authMiddleware, joinABet);
router.get('/getUserBets', authMiddleware, getUserBets);
router.post('/getBetDetails', authMiddleware, getBetDetails);
router.post('/deleteBet', authMiddleware, deleteABet);
router.post('/quitBet', authMiddleware, quitABet);
router.post('/getParticipants', authMiddleware, getParticipants);
router.post('/checkJoinABet', authMiddleware, checkJoinABet);


module.exports = router;