var ProjectSection = require('../models/projectSection');
var authenticateRequest = require('../utilitiyScripts/authenticateRequest');

exports.createSection = (req, res, next) => {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.json({message: decodedToken});
  }
}