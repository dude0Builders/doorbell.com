import mongoose from 'mongoose';

var productTypeModel = mongoose.Schema({
    type:{type:String, unique:true},
    classes:[{
      type:String
    }]
});

productTypeModel.methods.getType = function(){
  return this.type;
}

productTypeModel.methods.getAllClasses = function(){
  return this.classes;
}

productTypeModel.methods.getclass = function(index){
  return this.classes[index];
}
mongoose.model('ProductType', productTypeModel, 'ProductType');
