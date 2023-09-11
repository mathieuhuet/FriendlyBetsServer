const secret = require('../../secret');
const jwt = require('jsonwebtoken');
const mongoUserDB = require('../../config/mongoUser');

const UserVerification = mongoUserDB.model('userVerification', require('../../schemas/User/userVerification'));
const User = mongoUserDB.model('users', require('../../schemas/User/user'));


// Verify code sent by the user for a successful login.
const verify = (req, res) => {
  let {email, loginCode} = req.body;
  email = email.trim();
  UserVerification.find({email}).then((data) => {
    if (data.length && data[0].expiresAt < Date.now()) {
      res.status(403).json({
        error: true,
        message: "Can't verify your login code, last login code has expire because it has been sent over than 10 minutes ago.",
        data: null
      })
      // delete verification because it has expired., so no need to keep it.
      // user doesnt need to be informed, that's why we're not doing anything in case it succeed or fail.
      UserVerification.deleteMany({email}).then(() => {}).catch(() => {})
    } else if (data.length && (loginCode !== data[0].loginCode)) {
      res.status(403).json({
        error: true,
        message: "The code you entered didn't match, check that you properly entered the code or ask for a new one.",
        data: null
      })
    } else if (data.length && (loginCode === data[0].loginCode)) {
      User.updateOne({email}, {verified: true, online: true}).then(() => {
        // Finding the user in the db just so we can get his _id variable 
        User.find({email}).then(data => {
          if (data.length) {
            const _id = data[0]._id;
            const accessToken = jwt.sign({ _id }, secret.SECRET_KEY);
            res.status(200).json({
              error: false,
              message: "Verification was successful.",
              data: {accessToken}
            })
          }
        }).catch(err => {
          console.log(err);
          res.status(500).json({
            error: true,
            message: "An internal error occured. Please try again.",
            data: null
          })
        })
      // delete verification because user verified properly so no need to keep the verification.
      // user doesnt need to be informed, that's why we're not doing anything in case it succeed or fail.
      UserVerification.deleteMany({email}).then(() => {}).catch(() => {})
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          message: "The code you entered was good. But an internal error occured while validating the user, try again please.",
          data: null
        })
      })
    } else {
      res.status(500).json({
        error: true,
        message: "An error occured while checking for existing email verification code",
        data: null
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An error occured while checking for existing email verification code",
      data: null
    })
  })
};

module.exports = verify;
