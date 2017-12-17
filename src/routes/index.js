var express = require('express');
var router = express.Router();
import jwt from 'express-jwt';
var auth = jwt({
  secret: 'SECRET',
  userProperty: 'payload'
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = {
  router:router,
  auth:auth
}
