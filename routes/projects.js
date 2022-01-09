var express = require('express');
var router = express.Router();
var projectsController = require('../controllers/kanbanProjects');

router.post('/', projectsController.projectsListByUserID);

module.exports = router;
