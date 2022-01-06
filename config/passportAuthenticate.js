const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const passport = require("passport");
var bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, null, { message: `No such user: ${username}` });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: `Incorrect Password for user: ${username}` });
        }
      });
    });
  })
);
