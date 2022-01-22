var ProjectSection = require("../models/projectSection");
var SectionItem = require("../models/sectionItem");
var authenticateRequest = require("../utilitiyScripts/authenticateRequest");

exports.createSection = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    console.log(req.body);
    const project = new ProjectSection({
      name: req.body.sectionName,
      project: req.body.projectID,
    });
    project.save(function (err, section) {
      if (err) return next(err);
      res.json({
        message: `Created project section: ${section.name}`,
        section,
      });
    });
  }
};

exports.editSection = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    Project.deleteOne({ _id: req.body.id })
      .then(function (deleteResults) {
        if (deleteResults.deletedCount === 0) {
          res.status(401).json({ message: `Could not delete` });
        } else {
          res.json({ message: `Deleted project: ${req.body.id}` });
        }
      })
      .catch((err) => console.log(err));
  }
};

exports.deleteSection = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    Project.deleteOne({ _id: req.body.id })
      .then(function (deleteResults) {
        if (deleteResults.deletedCount === 0) {
          res.status(401).json({ message: `Could not delete` });
        } else {
          res.json({ message: `Deleted project: ${req.body.id}` });
        }
      })
      .catch((err) => console.log(err));
  }
};

exports.sectionByProjectId = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else {
    ProjectSection.find({ project: req.body.id }).exec(function (
      err,
      listOfSections
    ) {
      if (err) return next(err);
      res.json({ sections: listOfSections });
    });
  }
};
