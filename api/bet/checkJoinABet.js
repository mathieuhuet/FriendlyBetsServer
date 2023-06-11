const mongoBetDB = require('../../config/mongoBet');
const Bet = mongoBetDB.model('bets', require('../../schemas/Bet/bet'));

const mongoUserBetDB = require('../../config/mongoUserBet');

const checkJoinABet = async (req, res) => {
  try {
    let {_id} = req.user;
    let {betCode} = req.body;
    const findBet = await Bet.find({betCode})
    if (!findBet.length) {
      res.status(200).json({
        error: false,
        message: "No bet found with the code you entered.",
        data: null
      });
    } else if (findBet[0].bettingEndAt < Date.parse(new Date())) {
      res.status(200).json({
        error: false,
        message: `It is too late to join the bet.\nBet ended on ${new Date(findBet[0].bettingEndAt).toDateString()}\nat ${new Date(findBet[0].bettingEndAt).toLocaleTimeString()}`,
        data: null
      });
    } else {
      const UserBet = mongoUserBetDB.model(_id.toString(), require('../../schemas/UserBet/userBet'))
      const findUserBet = await UserBet.find({betCode});
      if (findUserBet.length) {
        res.status(200).json({
          error: false,
          message: "This bet is already registered to your profile, you can find it in 'View bets'.",
          data: null
        });
      } else {
        res.status(200).json({
          error: false,
          message: "Bet has been found.",
          data: findBet[0]
        })
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An error occured when saving the bet to the database.",
      data: null
    });
  }
};

module.exports = checkJoinABet;