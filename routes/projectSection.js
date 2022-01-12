var express = require('express');
var router = express.Router();
var projectSectionController = require('../controllers/projectSection');

router.post('/createSection', projectSectionController.createSection);

router.post('/sectionByProjectId', projectSectionController.sectionByProjectId);

module.exports = router;
