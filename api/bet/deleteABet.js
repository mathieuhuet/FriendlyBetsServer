const mongoBetDB = require('../../config/mongoBet');
const mongoUserBetDB = require('../../config/mongoUserBet');
const Bet = mongoBetDB.model('bets', require('../../schemas/Bet/bet'));


const deleteABet = async (req, res) => {
  try {
    let {_id} = req.user;
    let _idBet = req.body._id;
    if (!_idBet) {
      res.status(400).json({
        error: true,
        message: "Bet ID not provided",
        data: null
      });
    } else {
      const bet = await Bet.findOne({_id: _idBet});
      for (let i = 0; i < bet.participants.length; i++) {
        const UserBet = mongoUserBetDB.model(bet.participants[i], require('../../schemas/UserBet/userBet'));
        await UserBet.deleteOne({_id: _idBet});
      }
      const result = await Bet.deleteOne({_id: _idBet});
      res.status(200).json({
        error: false,
        message: "Bet was deleted successful.",
        data: result.deletedCount
      })
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

module.exports = deleteABet;