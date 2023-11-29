const jwt = require('jsonwebtoken');

// const { NODE_ENV, SECRET_KEY } = process.env;
// const { SECRET_KEY_DEV } = require('../utils/constants');

const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) { return next(new UnauthorizedError('Необходима авторизация')); }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET_KEY');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
