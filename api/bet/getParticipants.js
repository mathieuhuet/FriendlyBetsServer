const mongoUserDB = require('../../config/mongoUser');
const User = mongoUserDB.model('users', require('../../schemas/User/user'));

const mongoBetDB = require('../../config/mongoBet');
const Bet = mongoBetDB.model('bets', require('../../schemas/Bet/bet'));

const getParticipants = async (req, res) => {
  try {
    let {_id} = req.body;
    const betParticipants = await Bet.find({_id});
    let participants = [];
    for (let i = 0; i < betParticipants[0].participants.length; i++) {
      const user = await User.findOne({_id: betParticipants[0].participants[i]});
      participants.push(user);
    }
    res.status(200).json({
      error: false,
      message: "Participants were succesfully retrieved",
      data: participants
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

module.exports = getParticipants;