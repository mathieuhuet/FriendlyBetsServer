// User & UserVerification model for our mongoDB Database
const User = require('../../models/user');


const logout = (req, res) => {
  let {email} = req.user;
  email = email.trim();
  User.updateOne({email}, {online: false}).then(() => {
    res.status(200).json({
      error: false,
      message: "Verification was successful.",
      data: true
    })
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Internal error occured while logging you out, try again please.",
      data: null
    })
  })
};

module.exports = logout;