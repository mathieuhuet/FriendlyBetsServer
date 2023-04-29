const express = require('express');
const router = express.Router();

// Generating codes.
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// User & UserVerification model for our mongoDB Database
const User = require('../models/user');
const UserVerification = require('../models/userVerification')

// Email handler
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: "Zoho",
  auth: {
    user: process.env.AUTH_EMAIL || "put the email address you wanna use here",
    pass: process.env.AUTH_EMAIL_PASSWORD || "put your password here, you should hide it..."
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Properly connected using email address : " + process.env.AUTH_EMAIL);
  }
})

// Register
router.post('/register', (req, res) => {
  let {firstName, lastName, email} = req.body;
  // remove white-space
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  if ( firstName === "" || email === "") {
    res.status(400).json({
      error: true,
      message: "Empty input fields",
      data: null
    });
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(firstName)) {
    res.status(400).json({
      error: true,
      message: "Invalid first name format",
      data: null
    });
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(lastName)) {
    res.status(400).json({
      error: true,
      message: "Invalid last name format",
      data: null
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(400).json({
      error: true,
      message: "Invalid user email address",
      data: null
    });
  } else {
    // Checking if user already exists
    User.find({email}).then(result => {
      if (result.length) {
        res.status(403).json({
          error: true,
          message: "User with this email address already exist.",
          data: null
        });
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          verified: false,
          token: ''
        });
        newUser.save().then(result => {
          // Handle account verification
          sendVerificationEmail(result, res);
        }).catch(err => {
          console.log(err);
          res.status(500).json({
            error: true,
            message: "An error occured when saving the new user to the database.",
            data: null
          });
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "An error occured while checking if user already exist.",
        data: null
      });
    })
  }
});

// Login
router.post('/login', (req, res) => {
  let {email} = req.body;
  // remove white-space
  email = email.trim();
  if (email === "") {
    res.status(400).json({
      error: true,
      message: "Empty input fields",
      data: null
    });
  } else {
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
  }
});



// Send code to login via Email
const sendVerificationEmail = ({email}, res) => {
  const uniqueString= uuidv4();
  bcrypt.hash(uniqueString, 10).then(hashedString => {
    const loginCode = hashedString.trim().toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/0123456789]/gi, ''); //remove special character
    UserVerification.find({email}).then(data => {
      if (data.length && (data[0].createdAt + 30000) > Date.now()) {
        res.status(403).json({
          error: true,
          message: "Previous code has been sent less than 30 seconds ago, you have to wait 30 seconds to request a new code.",
          data: null
        })
      } else {
        if (data.length) {
          UserVerification.deleteMany({email}).then(() => {
            const mailOptions = {
              from: `FriendlyBets <${process.env.AUTH_EMAIL}>`,
              to: email,
              subject: "Login code for FriendlyBets",
              html: `<h1>${loginCode.slice(-4)}</h1><p>This is the code to complete the registration or login into your account.</p>` + 
              `<p>This code <b>expires in 10 minutes.</b></p>`,
            };
            const newVerification = new UserVerification({
              email: email,
              loginCode: loginCode.slice(-4),
              createdAt: Date.now(),
              expiresAt: Date.now() + 600000,
            })
            newVerification.save().then(() => {
              transporter.sendMail(mailOptions).then(() => {
                // email sent and verification revord saved
                res.status(201).json({
                  error: false,
                  message: 'Account created. Account found. Email verification code sent.',
                  data: null
                })
              }).catch(err => {
                console.log(err);
                res.status(500).json({
                  error: true,
                  message: "Verification email code failed",
                  data: null
                })
              })
            }).catch(err => {
              console.log(err);
              res.status(500).json({
                error: true,
                message: "Couldnt save verification email data in database",
                data: null
              })
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: true,
              message: "Couldnt delete previous code from database.",
              data: null
            })
          });
        } else {
          const mailOptions = {
            from: `FriendlyBets <${process.env.AUTH_EMAIL}>`,
            to: email,
            subject: "Login code for FriendlyBets",
            html: `<h1>${loginCode.slice(-4)}</h1><p>This is the code to complete the registration or login into your FriendlyBets account.</p>` + 
            `<p>This code <b>expires in 10 minutes.</b></p>`,
          };
          const newVerification = new UserVerification({
            email: email,
            loginCode: loginCode.slice(-4),
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000,
          })
          newVerification.save().then(() => {
            transporter.sendMail(mailOptions).then(() => {
              // email sent and verification revord saved
              res.status(201).json({
                error: false,
                message: 'Account created, Account found. Email verification code sent.',
                data: null
              })
            }).catch(err => {
              console.log(err);
              res.status(500).json({
                error: true,
                message: "Verification email code failed",
                data: null
              })
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: true,
              message: "Couldnt save verification email data in database",
              data: null
            })
          })
        }
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Failed to fetch from database",
        data: null
      })
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An error occurred while creating the login code.",
      data: null
    })
  })
}

// Verify code sent by the user for a successful login.
router.post("/verify", (req, res) => {
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
      User.updateOne({email}, {verified: true}).then(() => {
        res.status(200).json({
          error: false,
          message: "Verification was successful.",
          data: null
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
})



module.exports = router;