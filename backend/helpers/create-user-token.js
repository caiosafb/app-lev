// /backend/helpers/create-user-token.js
const jwt = require('jsonwebtoken');

const createUserToken = (user, req, res) => {
  const token = jwt.sign({
    id: user._id,
  }, 'secret', {
    expiresIn: '7d',
  });

  res.status(200).json({
    message: 'Você está autenticado!',
    token,
    userId: user._id,
  });
};

module.exports = createUserToken;
