const generateCode = require('../../utils/generateCode');

const mongoBetDB = require('../../config/mongoBet');
const Bet = mongoBetDB.model('bets', require('../../schemas/Bet/bet'));

const mongoUserBetDB = require('../../config/mongoUserBet');


const makeABet = async (req, res) => {
  try {
    let {email} = req.user;
    let {createdAt, bettingEndAt, betResolvedAt, betTitle, betExtraText} = req.body;
    // remove white-space
    betTitle = betTitle.trim();
    betExtraText = betExtraText.trim();
    if ( betTitle === "") {
      res.status(400).json({
        error: true,
        message: "Empty input fields",
        data: null
      });
    } else {
      let rightCode = true;
      let code = await generateCode(6);
      while (rightCode) {
        const data = await Bet.find({betCode: code});
        if (!data.length) {
          rightCode = false;
        } else {
          code = await generateCode(6);
        }
      }
      // Capitalize first letter of title
      betTitle = betTitle.charAt(0).toUpperCase() + betTitle.slice(1);
      const newBet = new Bet({
        admin: email,
        betCode: code,
        createdAt,
        bettingEndAt,
        betResolvedAt,
        betTitle,
        betExtraText
      });
      const result = await newBet.save();
      const UserBet = mongoUserBetDB.model(email, require('../../schemas/UserBet/userBet'))
      const newUserBet = new UserBet({
        _id: result._id,
        admin: email,
        betCode: code,
        joinedAt: result.createdAt,
        bettingEndAt,
        betResolvedAt,
        betTitle,
        betExtraText
      });
      const finalResult = await newUserBet.save();
      res.status(200).json({
        error: false,
        message: "Bet was created successfully",
        data: finalResult
      })
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

module.exports = makeABet;