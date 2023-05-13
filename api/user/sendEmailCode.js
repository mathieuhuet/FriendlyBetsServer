// Generating codes.
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const mongoUserDB = require('../../config/mongoUser');

const UserVerification = mongoUserDB.model('userVerification', require('../../schemas/User/userVerification'));

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
                  data: {email: email}
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
                data: {email: email}
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

module.exports = sendVerificationEmail;