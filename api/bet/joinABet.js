const mongoBetDB = require('../../config/mongoBet');
const Bet = mongoBetDB.model('bets', require('../../schemas/Bet/bet'));

const mongoUserBetDB = require('../../config/mongoUserBet');

const joinABet = async (req, res) => {
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
        findBet[0].participants.push(_id.toString());
        const participants = await Bet.updateOne({betCode}, {participants: findBet[0].participants});
        const newUserBet = new UserBet({
          _id: findBet[0]._id,
          admin: findBet[0].admin,
          betCode: findBet[0].betCode,
          joinedAt: Date.parse(new Date()),
        });
        const result = await newUserBet.save();
        res.status(200).json({
          error: false,
          message: "Bet has been added to your bet list. You can find it in 'View bets'.",
          data: result
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

module.exports = joinABet;