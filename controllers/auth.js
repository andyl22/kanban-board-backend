var jwt = require("jsonwebtoken");
var passport = require("passport");
var jwt_decode = require("jwt-decode");

exports.login = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message,
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const authToken = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "300s",
      });
      const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET);
      res.cookie("authToken", authToken, { httpOnly: true, maxAge: 300000 });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.json("Success");
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
