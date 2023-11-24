const mongoose = require('mongoose');

const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /https?:\/\/(www\.)?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/i.test(v); // eslint-disable-line
        },
        message: 'Введите URL',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /https?:\/\/(www\.)?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/i.test(v); // eslint-disable-line
        },
        message: 'Введите URL',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /https?:\/\/(www\.)?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/i.test(v); // eslint-disable-line
        },
        message: 'Введите URL',
      },
    },
    owner: {
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
