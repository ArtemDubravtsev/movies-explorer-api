const User = require("../models/user");

module.exports.addUser = (req, res) => {
  const { name, email, password } = req.body;
  User.create({ name, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) =>
      res.status(500).send({ message: "На сервере произошла ошибка" })
    );
};
