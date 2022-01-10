var jwt_decode = require("jwt-decode");

module.exports = decodeAuthToken = function (token) {
  return (token) ? jwt_decode(token) : null;
}