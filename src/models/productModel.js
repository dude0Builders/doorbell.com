var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  image:{
    type:String
  },
  detail: {
    type: String
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProducType'
  },
  ingredients:[
    {type:mongoose.Schema.Types.String}
  ],
  price: {
    type: Number
  },
  tags:[{
    type:mongoose.Schema.Types.String
  }]
  ,
  review:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Reviews'
   }
  ]

})

productSchema.methods.getProductById = function (productId) {

}



mongoose.model('Products', productSchema, 'Products');
