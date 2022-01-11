var express = require('express');
var router = express.Router();
var authController = require("../controllers/auth");


router.get('/', (req, res, next) => {
  res.json({ response: "Test" });
})

router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;