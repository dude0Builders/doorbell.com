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

router.get('/foods', function(req, res, next){
  res.render('foods');
})

router.get('/beverages', function(req, res, next){
  res.render('beverages');
})

router.get('/shop', function(req, res, next){
  res.render('shop');
})

router.get('/productdetail', function(req, res, next){
  res.render('product', {productid: req.body.productid});
})

module.exports = {
  router:router,
  auth:auth
}
