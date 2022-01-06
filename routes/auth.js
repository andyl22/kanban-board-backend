var express = require('express');
var router = express.Router();
var authController = require("../controllers/authController");


router.get('/', (req, res, next) => {
  res.json({ response: "Test" });
})

router.post('/login', authController.login);

module.exports = router;