// User & UserVerification model for our mongoDB Database
const User = require('../../models/user');
const getRandomColor = require('../../utils/getRandomColor');

const sendVerificationEmail = require('./sendEmailCode');


const register = (req, res) => {
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
  } else if (lastName.length > 20) {
    res.status(400).json({
      error: true,
      message: "Last name too long (max: 20 characters)",
      data: null
    });
  } else if (firstName.length > 20) {
    res.status(400).json({
      error: true,
      message: "First name too long (max: 20 characters)",
      data: null
    });
  } else {
    // Capitalize first letter of both names
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    if (lastName) {
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    }
    // Checking if user already exists
    User.find({email}).then(result => {
      if (result.length) {
        res.status(403).json({
          error: true,
          message: "User with this email address already exist.",
          data: null
        });
      } else {
        const backgroundColor = getRandomColor();
        const newUser = new User({
          firstName,
          lastName,
          email,
          profileIconColor: 'white',
          profileIconBackgroundColor: backgroundColor,
          profileIconPolice: 'normal',
          verified: false,
          online: false
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
};

module.exports = register;