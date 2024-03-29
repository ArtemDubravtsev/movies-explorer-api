const httpConstants = require('http2').constants;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, SECRET_KEY } = process.env;
const { SECRET_KEY_DEV } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }).then((user) => res.status(httpConstants.HTTP_STATUS_CREATED).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    })))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользаватель уже зарегистрирован'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV,
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользаватель уже зарегистрирован'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.clearCookie('jwt');
  return res.send({ message: 'logout - ok!' });
};
