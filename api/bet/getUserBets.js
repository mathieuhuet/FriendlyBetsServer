const mongoUserBetDB = require('../../config/mongoUserBet');


const getUserBets = async (req, res) => {
  try {
    let {email} = req.user;
    const UserBet = mongoUserBetDB.model(email, require('../../schemas/UserBet/userBet'))
    const findUserBet = await UserBet.find();
    res.status(200).json({
      error: false,
      message: "User bets were succesfully retrieved",
      data: findUserBet
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