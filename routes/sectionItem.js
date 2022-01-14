var express = require('express');
var router = express.Router();
var sectionItemController = require('../controllers/sectionItem');

router.post('/createSectionItem', sectionItemController.createSectionItem);

router.post('/sectionItemBySectionID', sectionItemController.sectionItemBySectionID);

module.exports = router;
