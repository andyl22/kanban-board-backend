const Project = require('../models/kanbanProjects');
var jwt_decode = require('../utilitiyScripts/jwtDecode');
var authController = require("./authController");

exports.projectsListByUserID = function (req, res, next) {
  if(!decodedToken) {
    console.log("No Token Provided")
    res.json({status: "No Token Provided"})
  } else {
    console.log(decodedToken)
    res.json({status: "done"});
  }
};

exports.createProject = function(req, res, next) {
  const userID = jwt_decode(req.cookies.authToken).id;
  if(userID) {
    const project = new Project({
      name: req.body.projectName,
      user: req.body.user
    })
    project.save(function (err) {
      if(err) return next(err);
      res.json(`Created project: ${req.body.projectName}`);
    })
  }
}

exports.getProjectList = function(req, res, next) {
  Project.find()
    .sort({name: 1})
    .populate('user', 'username')
    .exec(function (err, listOfProjects) {
      if (err) return next(err);
      res.json({projects: listOfProjects});
    })
}