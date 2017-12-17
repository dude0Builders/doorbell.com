var mongoose = require('mongoose');

var ordersSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  productid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  }],
  date: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: Number
  },
  merchantid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchants'
  }
})

mongoose.model('Orders', ordersSchema, 'Orders');
