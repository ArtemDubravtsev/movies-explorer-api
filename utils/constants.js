const SECRET_KEY_DEV = 'dev-secret';

const urlRegex = /https?:\/\/(www\.)?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/i;  // eslint-disable-line

const emailRegex = /^\S+@\S+\.\S+$/;

module.exports = { SECRET_KEY_DEV, urlRegex, emailRegex };
