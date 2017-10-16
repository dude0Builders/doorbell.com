import router from './index';
import user from '../models/userModel';
import userType from '../models/userTypeModel';
import product from '../models/productModel';
import productType from '../models/productTypeModel';
import mongoose from 'mongoose';

var Product = mongoose.model('Products');
var User = mongoose.model('Users');
var UserType = mongoose.model('UserType');
var ProductType = mongoose.model('ProductType');

router.get('/productlist', function (req, res, next) {
  Product.find(function (err, products) {
    if (err) {
      console.error('Error occurred while fething product list: ' + err.message);
      return res.status(500).json({
        'message': 'Error occurred while fetching product list ' + err.message
      });
    }
    if (!res) {
      console.info('No Products available');
      return res.status(404).json({
        'message': 'No Products available '
      });
    }
    return res.status(200).json(products);
  })
})

router.param('productid', function (req, res, next, id) {
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

router.get('/product/:productid', function (req, res, next) {
  return res.status(200).json(req.product);
})

router.post('/product/create', function (req, res, next) {
  var product = new Product();
  if (!req.body.name || !req.body.type) {
    return res.status(403).status({
      'message': 'Please fill all the fields'
    });
  }
  product.name = req.sanitize(req.body.name);
  product.type = req.sanitize(req.body.type);
  product.price = req.sanitize(req.body.price);

  var promise = product.save();
  promise.then(function (data) {
    console.log('Successfully created product ');
    return status(200).json({
      'message': 'Product successfully created.'
    });
  }).catch(function (err) {
    if (err) {
      console.error('Error while creating product : ' + err.message);
      return res.status(500).status({
        'message': 'Error occurred while creating proudct ' + err.message
      });
    }
  })
})


router.post('/productType/create', function (req, res, next) {
  if (!req.body.type) {
    return res.status(403).json({
      'message': 'Please enter all fields'
    });
  }
  var productType = new ProductType();
  productType.type = req.sanitize(req.body.type);
  var promise = productType.save();
  promise.then(function (data) {
    console.log("Product Type sucessfully created");
    return res(200).json({
      'message': 'ProductType successfully created.'
    });
  }).catch(function (err) {
    console.error('Error while creating productType : ' + err.message);
    return res.status(500).json({
      'message': 'Error occurred while creating productType : ' + err.messages
    });
  })
})

router.get('/producType/list', function (req, res, next) {
  ProductType.find(function (err, list) {
    if (err) {
      return res.status(500).json({
        'message': 'Error occurred while fetching product list ' + err.message
      });
    }
    return res.status(200).json(list);
  })
})
