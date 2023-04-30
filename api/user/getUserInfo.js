// User & UserVerification model for our mongoDB Database
const User = require('../../models/user');


const getUserInfo = (req, res) => {
  let {email} = req.body;
  // remove white-space
  email = email.trim();
  User.find({email}).then(data => {
    // if (data) === user found
    if (data.length) {
      sendVerificationEmail(data[0], res);
    } else {
      res.status(403).json({
        error: true,
        message: "This user does not exist, please create an account.",
        data: null
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An error occured while checking for existing user.",
      data: null
    })
  })
};

module.exports = getUserInfo;