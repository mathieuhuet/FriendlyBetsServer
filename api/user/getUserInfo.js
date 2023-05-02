

const getUserInfo = (req, res) => {
  const data = {firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email};
  res.status(200).json({
    error: false,
    message: "Successfully retrieve user info.",
    data: data
  })
};

module.exports = getUserInfo;