const jwt = require("jsonwebtoken");
const passport = require("passport");



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

      const token = jwt.sign(JSON.stringify({name: user.username, id: user._id}), process.env.SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
};
