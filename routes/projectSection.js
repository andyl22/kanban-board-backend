var express = require('express');
var router = express.Router();
var projectSectionController = require('../controllers/projectSection');

router.post('/createSection', projectSectionController.createSection);

router.post('/sectionByProjectId', projectSectionController.sectionByProjectId);

router.post('/editSectionByID', projectSectionController.editSectionByID);

router.post('/deleteSectionById', projectSectionController.deleteSectionById);

module.exports = router;
