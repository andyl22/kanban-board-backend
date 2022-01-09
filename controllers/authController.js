const jwt = require("jsonwebtoken");
const passport = require("passport");
const jwt_decode = require("jwt-decode");

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
      // generate a signed son web token with the contents of user object and return it in the response
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
  if (req.cookies.refreshToken) {
    const decodedToken = jwt_decode(req.cookies.refreshToken);
    const authToken = jst.sign(
      { username: decodedToken.id },
      process.env.SECRET,
      { expiresIn: "300s" }
    );
    res.cookie("authToken", authToken, { httpOnly: true, maxAge: 300000 });
    res.json("Refreshed Token");
  } else {
    res.json("Missing Auth Token");
  }
};
