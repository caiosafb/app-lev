const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserByToken = async (token) => {
  if (!token) {
    throw new Error('Token inválido!');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  return user;
};

module.exports = getUserByToken;
