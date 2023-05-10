// Bet model for our mongoDB Database
const Bet = require('../../models/bet');



const makeABet = (req, res) => {
  let {email} = req.user
  let {betCode, createdAt, bettingEndAt, betResolvedAt, betTitle, betExtraText} = req.body;
  // remove white-space
  betTitle = betTitle.trim();
  betExtraText = betExtraText.trim();
  if ( betTitle === "") {
    res.status(400).json({
      error: true,
      message: "Empty input fields",
      data: null
    });
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(betTitle)) {
    res.status(400).json({
      error: true,
      message: "Invalid first name format",
      data: null
    });
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(betExtraText)) {
    res.status(400).json({
      error: true,
      message: "Invalid last name format",
      data: null
    });
  } else if (betExtraText.length > 20) {
    res.status(400).json({
      error: true,
      message: "Last name too long (max: 20 characters)",
      data: null
    });
  } else if (betTitle.length > 20) {
    res.status(400).json({
      error: true,
      message: "First name too long (max: 20 characters)",
      data: null
    });
  } else {
    // Capitalize first letter of title
    betTitle = betTitle.charAt(0).toUpperCase() + betTitle.slice(1);
    const newBet = new Bet({
      admin: email,
      betCode,
      createdAt,
      bettingEndAt,
      betResolvedAt,
      betTitle,
      betExtraText
    });
    newBet.save().then(result => {
      res.status(200).json({
        error: false,
        message: "Bet was created successfully",
        data: result
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "An error occured when saving the bet to the database.",
        data: null
      });
    });
  }
};

module.exports = makeABet;