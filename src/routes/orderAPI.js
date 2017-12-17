import mongoose from 'mongoose';
import '../models/productModel';
import '../models/orderModel';
import '../models/userModel';
import {router, auth} from './index';

var Order = mongoose.model('Orders');
var Product = mongoose.model('Products');
var User = mongoose.model('Users');
var UserType = mongoose.model('UserType');

router.param('orderid', function (req, res, next, id) {
  var query = Order.findById(id);
  query.exec(function (err, order) {
    if (err) {
      console.error('Error while fetching Order with ID ' + id + " " + err.message);
      return next(err);
    }
    if (!order) {
      console.log("Can't find the order");
    }
    req.order = order;
    return next();
  })
})

router.get('/order/:orderid', auth, function (req, res, next) {
  return res.status(200).json(req.order);
})

router.post('/order/create', auth, function (req, res) {
  var userid = req.sanitize(req.body.userid);
  var productid = req.sanitize(req.body.productid);
  var date = req.sanitize(req.body.date);
  var quantity = req.sanitize(req.body.quantity);
  var merchantid = req.sanitize(req.body.merchantid);
  if (!productid || !date || !quantity || !merchantid) {
    console.log("Please enter all fields");
    return res.status(403).json({
      'message': 'Please fill all the fields.'
    });
  }

  var order = new Order();
  order.userid = userid;
  order.productid.push(productid);
  order.date = date;
  order.quantity = quantity;
  order.merchantid = merchantid;
  var promise = order.save();
  promise.then(function (data) {
    console.log("Order successfully created.");
    return res.status(200).json({
      'message': 'Order successfully created.'
    });
  }).catch(function (error) {
    console.log("Error occurred while creating order");
    return res.status(500).json({
      'message': 'Error occurred while creating order' + error
    });
  })

})

router.put('/order/:orderid', auth, function (req, res, next) {
  var order = req.order;
  order.date = req.sanitize(req.body.date);
  order.merchantid = req.sanitize(req.body.merchantid);
  order.quantity = req.sanitize(req.body.quantity);
  var promise = order.save();
  promise.then(function (data) {
    console.log('Order updated successfully');
    return res.status(200).json({
      'message': 'Order updated successfully.'
    });
  }).catch(function (err) {
    consoe.log('Error occurred while updating the order' + err);
    return res.status(500).json({
      'message': 'Error occurred while updating the order ' + err
    });
  })

})

router.delete('/order/:orderid', auth, function (req, res, next) {
 req.order.remove(function(err,data){
   if(err){
     console.log("Error while remove the order "+ err);
     return res.status(500).json({'message':'Error while removing the order '+ err});
   }
   console.log('Successfully removed the order');
   return res.status(200).json({'message':'Successfully removed the order'});
 })
})
