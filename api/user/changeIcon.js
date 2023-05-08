// User & UserVerification model for our mongoDB Database
const User = require('../../models/user');


const changeIcon = (req, res) => {
  let {profileIconColor,
    profileIconBackgroundColor,
    profileIconPolice} = req.body;
  let {email} = req.user
  if (profileIconBackgroundColor === "" || profileIconColor === "" || profileIconPolice === "") {
    res.status(400).json({
      error: true,
      message: "Empty input fields",
      data: null
    });
  } else {
    email = email.trim();
    User.updateOne({email}, {
        profileIconBackgroundColor: profileIconBackgroundColor,
        profileIconColor: profileIconColor,
         profileIconPolice: profileIconPolice}).then(() => {
      res.status(200).json({
        error: false,
        message: "Icon updated succesfully",
        data: {
            profileIconBackgroundColor: profileIconBackgroundColor,
             profileIconColor: profileIconColor,
            profileIconPolice: profileIconPolice}
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Internal error occured while updating icon, try again please.",
        data: null
      })
    })
  }
};

module.exports = changeIcon;