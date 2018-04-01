import {router,auth} from './index';
import user from '../models/userModel';
import userType from '../models/userTypeModel';
import product from '../models/productModel';
import productType from '../models/productTypeModel';
import mongoose from 'mongoose';


var Product = mongoose.model('Products');
var User = mongoose.model('Users');
var UserType = mongoose.model('UserType');
var ProductType = mongoose.model('ProductType');

router.get('/product/list', auth, function (req, res, next) {

  Product.find(function (err, products) {
    if (err) {
      console.error('Error occurred while fething product list: ' + err.message);
      return res.status(500).json({
        'message': 'Error occurred while fetching product list ' + err.message
      });
    }
    if (!products) {
      console.info('No Products available');
      return res.status(404).json({
        'message': 'No Products available '
      });
    }
    return res.status(200).json(products);
  })
})


router.post('/product/create', auth, function (req, res, next) {
  console.log("Creating a new product");
  if (!req.body.name || !req.body.type || !req.body.image) {
    return res.status(403).json({
      'message': 'Please fill all the fields'
    });
  }
  var product = new Product();
  product.name = req.sanitize(req.body.name);
  product.image = req.sanitize(req.body.image);
  product.detail = req.sanitize(req.body.detail);
  product.type = req.sanitize(req.body.type);
  product.price = req.sanitize(req.body.price);
  product.ingredients = req.sanitize(req.body.ingredients).split(",");
  product.tags = req.sanitize(req.body.tags);
  product.tags = [];

  var promise = product.save();
  promise.then(function (data) {
    console.log('Successfully created product ');
    return res.status(200).json({
      'message': 'Product successfully created.'
    });
  }).catch(function (err) {

      console.error('Error while creating product : ' + err.message);
      return res.status(500).json({
        'message': 'Error occurred while creating proudct ' + err.message
      });

  })
})

router.param('productid',  function (req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function (err, product) {
    if (err) {
      console.error('Error while fetching product with ID ' + id + " " + err.message);
      return next(err);
    }
    if (!product)
      return next(new Error("Can't find the Product"));
    req.product = product;
    return next();
  })
})

router.get('/product/:productid', auth, function (req, res, next) {
  return res.status(200).json(req.product);
})



router.get('/product/:producttypename', function(req, res, next){
  if(!req.params.producttypename){
    return res.status(400).json([]);
  }
  Product.find({type:req.params.producttypename}).then(data=>{
    return res.status(200).json(data);
  }).catch(err=>{
    return res.status(500).json({
      message:'Error while fetching the products data',
      error : err.message
    })
  })
});

router.delete('/product/:productid', auth, function(req, res, next){
  req.product.remove().then(function(res){
    return res.status(200).json({
      message:"Product Successfully removed"
    })
  }).catch(function(err){
    return res.status(500).json({
    messsage:"Error occurred while removing the product",
    error : err.message
    })
  })
})

router.post('/productType/create', auth, function (req, res, next) {
  if (!req.body.type || !req.body.classes) {
    if(!req.body.classes){
      return res.status(403).json({
        'message': 'ProductType should have at least one class'
      })
    }
    return res.status(403).json({
      'message': 'Please enter all fields'
    });
  }
  var productType = new ProductType();
  productType.type = req.sanitize(req.body.type);
  console.log(req.body.classes)
  console.log(req.sanitize(req.body.classes))
  productType.classes =  req.sanitize(req.body.classes).split(",");
  var promise = productType.save();
  promise.then(function (data) {
    console.log("Product Type sucessfully created");
    return res.status(200).json({
      'message': 'ProductType successfully created.'
    });
  }).catch(function (err) {
    console.error('Error while creating productType : ' + err.message);
    return res.status(500).json({
      'message': 'Error occurred while creating productType : ' + err.message
    });
  })
})

router.get('/producType/list', auth, function (req, res, next) {
  ProductType.find(function (err, list) {
    if (err) {
      return res.status(500).json({
        'message': 'Error occurred while fetching product list ' + err.message
      });
    }
    return res.status(200).json(list);
  })
})

router.param('productTypeId', function(req, res, next, id){
  var query = ProductType.findById(id);
  query.exec(function (err, productType) {
    if (err) {
      console.error('Error while fetching product type with ID ' + id + " " + err.message);
      return next(err);
    }
    if (!productType)
      return next(new Error("Can't find the Product Type"));
    req.productType = productType;
    return next();
  })
})


router.get('/product/all/:productTypeId', auth, function(req, res, next){
  Product.find({'type':req.productType}).then(function(data){
    return res.status(200).json(data);
  }).catch(function(err){
    return res.status(500).json({
      message:'Error while fetching the products',
      error: err.message
    })
  })
})

router.get('/productType/:productTypeId',  auth, function(req, res, next){
    res.status(200).json(req.productType);
})


router.put('/productType/:productTypeId', auth, function(req, res, next){
  let productType = req.productType;
  const classes = req.sanitize(req.body.classes).split(',');
  console.log(classes, classes instanceof Array)
  if(classes instanceof Array)
  productType.classes =  productType.classes.concat(classes.filter(item=> productType.classes.indexOf(item)<0));
  productType.save().then(function(data){
    return res.status(200).json({
      message:'ProductType Successfully Updated'
    })
  }).catch(function(err){
      return res.status(500).json({message:'Error while udpating the producttype',
      error : err.message
    });
  })

  router.delete('/productType/:productTypeId/:class', auth, function(res, req, next){
    if(!req.params.class){
      return res.status(403).json({
        message:'Please fill al the fields.'
      })
    }
    const clas =  req.params.class
    let productType = req.productType;
    const index = productType.classes.indexOf(clas)
    productType.classes.splice(index, 1);
    productType.save().then(function(data){
      return res.status(200).json({
        message:'Classes for the productType udpated'
      })
    }).catch(function(err){
      return res.status(500).json({
      message:'Error occurred while updating the classes of the productType',
      error : err.message
      });
    })
  })
})
