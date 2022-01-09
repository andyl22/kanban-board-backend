const User = require("../models/users");
const bcrypt = require("bcrypt");

exports.createUser = function (req, res, next) {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (err) return err;
    if (user) {
      res.json({
        response: `There is already an existing user: ${user.username}`,
      });
    } else {
      bcrypt.hash(password, 10, (err, hashPassword) => {
        if (err) return next(err);
        const newUser = new User({
          username: username,
          password: hashPassword,
          active: true,
        });
        newUser.save(function (err) {
          if (err) return next(err);
          res.json({ response: "Success" });
        });
      });
    }
  });
};

exports.loginUser = function (req, res, next) {};
