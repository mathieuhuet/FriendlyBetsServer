const mongoUserBetDB = require('../../config/mongoUserBet');
const mongoBetDB = require('../../config/mongoBet');
const Bet = mongoBetDB.model('bets', require('../../schemas/Bet/bet'));

const getUserBets = async (req, res) => {
  try {
    let {_id} = req.user;
    const UserBet = mongoUserBetDB.model(_id.toString(), require('../../schemas/UserBet/userBet'))
    const findUserBet = await UserBet.find();
    const allUserBets = [];
    for (let i = 0; i < findUserBet.length; i++) {
      const fullBet = await Bet.findOne({_id: findUserBet[i]._id})
      allUserBets.push(fullBet);
    }
    res.status(200).json({
      error: false,
      message: "User bets were succesfully retrieved",
      data: allUserBets
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An error occured when saving the bet to the database.",
      data: null
    });
  }
};

module.exports = getUserBets;