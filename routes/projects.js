var express = require('express');
var router = express.Router();
var projectController = require('../controllers/project');

router.post('/', projectController.projectsListByUserID);

router.post('/createProject', projectController.createProject);

router.get('/getProjectList', projectController.getProjectList);

module.exports = router;
