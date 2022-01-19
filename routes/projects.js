var express = require('express');
var router = express.Router();
var projectController = require('../controllers/project');

router.post('/projectsListByUserID', projectController.projectsListByUserID);

router.post('/getProjectByID', projectController.getProjectByID);

router.post('/createProject', projectController.createProject);

router.post('/updateProjectName', projectController.updateProjectName);

router.post('/deleteProject', projectController.deleteProject);

router.get('/getProjectList', projectController.getProjectList);

module.exports = router;
