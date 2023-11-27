require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/moviesdb" } =
  process.env;

const app = express();

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("БД подключена"); // eslint-disable-line
  })
  .catch(() => {
    console.log("Не удалось подключиться к БД"); // eslint-disable-line
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/index"));

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT);
