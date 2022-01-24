var SectionItem = require("../models/sectionItem");
var authenticateRequest = require("../utilitiyScripts/authenticateRequest");

exports.createSectionItem = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    const sectionItem = new SectionItem({
      name: req.body.itemName,
      description: req.body.itemDescription,
      date_of_creation: req.body.dateOfCreation,
      projectID: req.body.projectID,
      sectionID: req.body.sectionID,
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

exports.editSectionItem = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    SectionItem.updateOne(
      { _id: req.body.itemID },
      {
        name: req.body.updateBody.name,
        description: req.body.updateBody.description
      },
      function (err, updatedItem) {
        if (err) return next(err);
        if(updatedItem.acknowledged) {
          res.json({ success: true, message: `Updated section items: ${updatedItem.modifiedCount}` });
        } else {
          res.json({ success: false, message: `Could not update item: ${req.body.name}`})
        }
      }
    );
  }
};

exports.deleteSectionItem = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res, next);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else if (decodedToken) {
    SectionItem.deleteOne(
      { _id: req.body.itemID },
      function (err, deletedItem) {
        if (err) return next(err);
        res.json({ message: `Deleted ${deletedItem.deletedCount} item` });
      }
    );
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
      res.json({ items: listOfSections, sectionID: req.body.sectionID });
    });
  }
};

exports.moveItem = function (req, res, next) {
  const decodedToken = authenticateRequest(req, res);
  if (decodedToken.errorMessage) {
    res.status(401).json({ error: decodedToken.errorMessage });
  } else {
    SectionItem.findByIdAndUpdate(req.body.id, {sectionID: req.body.updatedSectionID}, function (err, doc) {
      if(err) return next(err);
      res.json({message: `Updated item: ${doc}`});
    })
  }
}
