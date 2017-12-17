var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  detail: {
    type: String
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProducType'
  },
  price: {
    type: Number
  }
})

productSchema.methods.getProductById = function (productId) {

}



mongoose.model('Products', productSchema, 'Products');
