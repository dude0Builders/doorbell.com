import mongoose from 'mongoose';

var productTypeModel = mongoose.Schema({
    type:{type:String, unique:true}
});

productTypeModel.methods.getType = function(){
  return this.type;
}

mongoose.model('ProductType', productTypeModel, 'ProductType');
