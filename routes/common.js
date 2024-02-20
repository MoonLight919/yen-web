var express = require('express');
var sender = require('../utils/send-page.util');

var router = express.Router();

router.get('/', function(req, res, next) {
  sender.sendPage(res, 'index');
});

module.exports = router;
