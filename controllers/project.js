var Project = require("../models/project");
var ProjectSection = require("../models/projectSection");
var SectionItem = require("../models/sectionItem");
var authenticateRequest = require("../utilitiyScripts/authenticateRequest");

exports.projectsListByUserID = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else {
    Project.find({ user: decodedToken.id }).exec(function (
      err,
      listOfProjects
    ) {
      if (err) return err;
      res.json({ projects: listOfProjects });
    });
  }
};

exports.getProjectByID = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    Project.findById(req.body.id, function (err, project) {
      if (err) return next(err);
      res.json({ project: project });
    });
  }
};

exports.createProject = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    const project = new Project({
      name: req.body.projectName,
      user: decodedToken.id,
    });
    project.save(function (err, project) {
      if (err) return next(err);
      res.json({
        message: `Created project: ${project.name}`,
        project: project,
      });
    });
  }
};

exports.updateProjectName = function (req, res, next) {
  Project.findByIdAndUpdate(
    req.body.projectID,
    { name: req.body.projectName },
    function (err, doc) {
      if (err) return next(err);
      res.json({ message: doc });
    }
  );
};

exports.deleteProject = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    Project.deleteOne({ _id: req.body.id }, function (err, project) {
      if (err) return next(err);
      ProjectSection.deleteMany(
        { project: req.body.id },
        function (err, sections) {
          if (err) return next(err);
          SectionItem.deleteMany(
            { projectID: req.body.id },
            function (err, items) {
              if (err) return next(err);
              res.json({
                message: { project: project, sections: sections, items: items },
              });
            }
          );
        }
      );
    });
  }
};

exports.getProjectList = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    Project.find({ user: decodedToken.id })
      .sort({ name: 1 })
      .exec(function (err, listOfProjects) {
        if (err) return next(err);
        res.json({ projects: listOfProjects });
      });
  }
};
