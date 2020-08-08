const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
  try {
    // User should have jwt cookie set or redirect to login
    if (!req.cookies.jwt) {
      throw new Error();
    }
    const token = req.cookies.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token' : token });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    return res.status(401).send({
      errorCode: 401,
      error: 'Please login with SplitBill'
    });
  }
};

module.exports = userAuth;
