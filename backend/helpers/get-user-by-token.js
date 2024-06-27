const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserByToken = async (token) => {
  if (!token) {
    throw new Error('Token inválido!');
  }

  const decoded = jwt.verify(token, 'secret');
  const user = await User.findById(decoded.id);
  return user;
};

module.exports = getUserByToken;
