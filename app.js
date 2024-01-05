require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centerHandlerError = require('./middlewares/centerHandlerError');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("БД подключена"); // eslint-disable-line
  })
  .catch(() => {
    console.log("Не удалось подключиться к БД"); // eslint-disable-line
  });

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(centerHandlerError);

app.listen(PORT);
