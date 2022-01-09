const Projects = require('../models/kanbanProjects');
var jwt_decode = require('jwt-decode');

exports.projectsListByUserID = function (req, res, next) {
  const decodedToken = (req.cookies.token) ? jwt_decode(req.cookies.token) : null;
  if(!decodedToken) {
    console.log("No Token Provided")
    res.json({status: "No Token Provided"})
  } else {
    console.log(decodedToken)
    res.json({status: "done"});
  }
};