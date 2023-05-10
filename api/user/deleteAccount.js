// User & UserVerification model for our mongoDB Database
const User = require('../../models/user');


const deleteAccount = (req, res) => {
  let {email} = req.user;
  // remove white-space
  email = email.trim();
  if (email === "") {
    res.status(400).json({
      error: true,
      message: "Empty input fields",
      data: null
    });
  } else {
    User.deleteOne({email}).then(data => {
      res.status(200).json({
        error: false,
        message: "Delete was successful.",
        data: data.deletedCount
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "An error occured while deleting the user.",
        data: null
      })
    })
  }
};

module.exports = deleteAccount;