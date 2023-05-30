
const mongoBetDB = require('../../config/mongoBet');
const Bet = mongoBetDB.model('bets', require('../../schemas/Bet/bet'));
const mongoUserBetDB = require('../../config/mongoUserBet');

const quitABet = async (req, res) => {
  try {
    let {_id} = req.user;
    let _idBet = req.body._id;
    const findBet = await Bet.find({_id: _idBet})
    if (!_idBet) {
      res.status(400).json({
        error: true,
        message: "Bet ID not provided",
        data: null
      });
    } else {
      const index = findBet[0].participants.indexOf(_id.toString());
      if (index > -1) {
        findBet[0].participants.splice(index, 1);
        const participants = await Bet.updateOne({_id: _idBet}, {participants: findBet[0].participants});
        const UserBet = mongoUserBetDB.model(_id.toString(), require('../../schemas/UserBet/userBet'));
        const result = await UserBet.deleteOne({_id: _idBet});
        res.status(200).json({
          error: false,
          message: "Bet was deleted successful.",
          data: result.deletedCount
        })
      } else {
        res.status(500).json({
          error: true,
          message: "Couldnt find user in the participants list",
          data: null
        })
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "An error occured while deleting the user.",
      data: null
    })
  }
};

module.exports = quitABet;