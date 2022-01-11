var Project = require("../models/project");
var authenticateRequest = require("../utilitiyScripts/authenticateRequest");

exports.projectsListByUserID = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res);
  if (!decodedToken) {
    console.log("No Token Provided");
    res.json({ status: "No Token Provided" });
  } else {
    console.log(decodedToken);
    res.json({ status: "done" });
  }
};

exports.createProject = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.json(decodedToken.errorMessage);
  } else if (decodedToken) {
    const project = new Project({
      name: req.body.projectName,
      user: decodedToken.id,
    });
    project.save(function (err, project) {
      if (err) return next(err);
      res.json({ message: `Created project: ${project.name}`, project: project });
    });
  }
};

exports.getProjectList = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.json(decodedToken.errorMessage);
  } else if (decodedToken) {
    Project.find({ user: decodedToken.id })
      .sort({ name: 1 })
      .exec(function (err, listOfProjects) {
        if (err) return next(err);
        res.json({ projects: listOfProjects });
      });
  }
};
