var Project = require("../models/kanbanProjects");
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
  const userID = authenticateRequest(req.cookies.authToken).id;
  if (userID) {
    const project = new Project({
      name: req.body.projectName,
      user: userID,
    });
    project.save(function (err) {
      if (err) return next(err);
      res.json({ message: `Created project: ${req.body.projectName}` });
    });
  } else if (req.cookies.refreshToken) {
    res.json({ message: "Refreshing Token" });
  } else {
    res.json({ message: "No JWT token provided." });
  }
};

exports.getProjectList = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.message) {
    res.json(decodedToken.message);
  } else if (decodedToken) {
    Project.find({ user: decodedToken.id })
      .sort({ name: 1 })
      .populate("user", "username")
      .exec(function (err, listOfProjects) {
        if (err) return next(err);
        res.json({ projects: listOfProjects });
      });
  } else {
    res.json({message: "Something went wrong."})
  }
};
