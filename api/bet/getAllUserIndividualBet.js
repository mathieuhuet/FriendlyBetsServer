const mongoUserBetDB = require('../../config/mongoUserBet');


const getAllUserIndividualBet = async (req, res) => {
  try {
    let {user_id_list, bet_id} = req.body;
    const allUserBets = []
    for (let i = 0; i < user_id_list.length; i++) {
      const UserBet = mongoUserBetDB.model(user_id_list[i], require('../../schemas/UserBet/userBet'))
      const findUserBet = await UserBet.find({_id: bet_id});
      allUserBets.push({[user_id_list[i]]: {userBet: findUserBet[0].bet, userJoinedAt: findUserBet[0].joinedAt}});
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

module.exports = getAllUserIndividualBet;