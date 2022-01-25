const User = require("../models/users");
const bcrypt = require("bcrypt");
var generateAndSetAuthTokens = require("../utilitiyScripts/generateAndSetAuthTokens");

exports.createUser = function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(200).json({
      error: `Missing username or password`,
    });
    return;
  }

  User.findOne({ username: username }, (err, user) => {
    if (err) return err;
    if (user) {
      res.status(200).json({
        error: `There is already an existing user: ${user.username}`,
      });
    } else {
      bcrypt.hash(password, 10, (err, hashPassword) => {
        if (err) return next(err);
        const newUser = new User({
          username: username,
          password: hashPassword,
          active: true,
        });
        newUser.save(function (err, document) {
          if (err) return next(err);
          generateAndSetAuthTokens({ id: document.id }, res);
          res.json({ message: "Success" });
        });
      });
    }
  });
};

exports.updateUser = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else {
    User.findByIdAndUpdate(
      decodedToken.id,
      req.body.updateBody,
      function (err, doc) {
        if (err) return next(err);
        console.log(doc);
        res.json({ message: `Updated user to: ${doc}` });
      }
    );
  }
};
