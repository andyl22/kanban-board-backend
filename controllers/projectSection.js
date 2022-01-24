var ProjectSection = require("../models/projectSection");
var SectionItem = require("../models/sectionItem");
var authenticateRequest = require("../utilitiyScripts/authenticateRequest");

exports.createSection = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    const project = new ProjectSection({
      name: req.body.sectionName,
      project: req.body.projectID,
      color: req.body.color,
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

exports.editSectionByID = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    ProjectSection.findByIdAndUpdate(
      req.body.id,
      req.body.updateBody,
      function (err, doc) {
        if (err) return next(err);
        res.json({ message: `Updated section: ${doc}` });
      }
    );
  }
};

exports.deleteSectionById = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    ProjectSection.deleteOne({ _id: req.body.id })
      .then(function (sections) {
        if (sections.deletedCount === 0) {
          res.status(401).json({ message: `Could not delete` });
        } else {
          SectionItem.deleteMany(
            { sectionID: req.body.id },
            function (err, items) {
              if (err) return next(err);
              res.json({
                message: { sections: sections, items: items },
              });
            }
          );
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
