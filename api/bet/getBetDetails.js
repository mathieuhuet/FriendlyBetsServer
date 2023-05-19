const mongoBetDetailsDB = require('../../config/mongoBetDetails');
const BetDetails = mongoBetDetailsDB.model('bets', require('../../schemas/BetDetails/betDetails'));


const getBetDetails = async (req, res) => {
  try {
    let {email} = req.user;


    res.status(200).json({
      error: false,
      message: "Bet was created successfully",
      data: result
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

module.exports = getBetDetails;