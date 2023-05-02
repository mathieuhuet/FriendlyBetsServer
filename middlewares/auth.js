const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';

const authMiddleware = async (req, res, next) => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];
  console.log(req.headers);
  if (!authHeaders) {
    return res.status(403).json({
      error: true,
      message: "AccessToken Authorization missing",
      data: null
    });
  }
  const accessToken = authHeaders.split(' ')[1];
  try {
    // verify & decode token payload,
    const { _id } = jwt.verify(accessToken, SECRET_KEY);
    // attempt to find user object and set to req
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Authorization refused.",
        data: null
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error: true,
      message: "Error Auhtorization",
      data: null
    });
  }
};

module.exports = authMiddleware;