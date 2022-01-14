var jwt = require("jsonwebtoken");

module.exports = function generateAndSetAuthTokens(payload, res) {
  const authToken = jwt.sign(payload, process.env.SECRET, {expiresIn: "300s"});
  const refreshToken = jwt.sign(payload, process.env.SECRET);
  res.cookie("authToken", authToken, { httpOnly: true, maxAge: 300000 });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
}