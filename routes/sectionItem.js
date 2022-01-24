var express = require("express");
var router = express.Router();
var sectionItemController = require("../controllers/sectionItem");

router.post("/createSectionItem", sectionItemController.createSectionItem);

router.post(
  "/sectionItemsBySectionID",
  sectionItemController.sectionItemsBySectionID
);

router.post("/editSectionItem", sectionItemController.editSectionItem);

router.post("/deleteSectionItem", sectionItemController.deleteSectionItem);

router.post("/moveItem", sectionItemController.moveItem);

module.exports = router;
