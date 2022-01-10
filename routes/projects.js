var express = require('express');
var router = express.Router();
var projectsController = require('../controllers/kanbanProjects');

router.post('/', projectsController.projectsListByUserID);

router.post('/createProject', projectsController.createProject);

router.get('/getProjectList', projectsController.getProjectList);

module.exports = router;
