var jwt_decode = require("jwt-decode");
var { refreshToken } = require("../controllers/auth");

module.exports = authenticateRequest = function (req, res, next) {
  if (req.cookies.authToken) {
    try {
      return jwt_decode(req.cookies.authToken);
    } catch (e) {
      return { errorMessage: e };
    }
  } else if (req.cookies.refreshToken) {
    if (req.cookies.refreshToken) {
      const authToken = refreshToken(req, res, next);
      if (authToken) return jwt_decode(authToken);
    } else {
      return e;
    }
  } else {
    return { errorMessage: "No Token Was Provided." };
  }
};
