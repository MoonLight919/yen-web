var express = require('express');
var sender = require('../utils/send-page.util');

var router = express.Router();

router.get('/', function(req, res, next) {
  sender.sendPage(res, 'profile');
});

router.get('/alerts-in-ua', function(req, res, next) {
  sender.sendPage(res, 'alerts-in-ua');
});

router.get('/iqair', function(req, res, next) {
  sender.sendPage(res, 'iqair');
});

router.get('/radiation', function(req, res, next) {
  sender.sendPage(res, 'radiation');
});

router.get('/authorize', function(req, res, next) {
  sender.sendPage(res, 'authorize');
});

module.exports = router;
