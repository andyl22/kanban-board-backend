var passport = require("passport");
var jwt_decode = require("jwt-decode");
var jwt = require("jsonwebtoken");
var generateAndSetAuthTokens = require("../utilitiyScripts/generateAndSetAuthTokens");

exports.login = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json({ error: info.message });
    }

    req.login(user, { session: false }, (err) => {
      if (err) res.send(err);
      generateAndSetAuthTokens({ id: user.id }, res);
      console.log(user)
      res.json({ name: user.username, darkMode: user.darkMode });
    });
  })(req, res, next);
};

exports.logout = function (req, res, next) {
  res.clearCookie("authToken");
  res.clearCookie("refreshToken");
  res.json({ status: "Token cookie cleared" });
};

exports.refreshToken = function (req, res, next) {
  const decodedToken = jwt_decode(req.cookies.refreshToken);
  const authToken = jwt.sign({ id: decodedToken.id }, process.env.SECRET, {
    expiresIn: "300s",
  });
  res.cookie("authToken", authToken, { httpOnly: true, maxAge: 300000 });
  return authToken;
};
