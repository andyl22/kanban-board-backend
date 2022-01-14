var SectionItem = require("../models/sectionItem");
var authenticateRequest = require("../utilitiyScripts/authenticateRequest");

exports.createSectionItem = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    const sectionItem = new SectionItem({
      name: req.body.sectionName,
      description: req.body.sectionDescription,
      sectionID: req.body.sectionID,
      projectID: req.body.projectID,
      date_of_creation: req.body.date_of_creation,
    });
    sectionItem.save(function (err, sectionItem) {
      if (err) return next(err);
      res.json({
        message: `Created section item: ${sectionItem.name}`,
        sectionItem,
      });
    });
  }
};

exports.sectionItemsBySectionID = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else {
    SectionItem.find({ sectionID: req.body.sectionID }).exec(function (
      err,
      listOfSections
    ) {
      if (err) return next(err);
      res.json({ sections: listOfSections });
    });
  }
};
