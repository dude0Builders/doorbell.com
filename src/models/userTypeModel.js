import mongoose from 'mongoose';

var userTypeSchema = mongoose.Schema({
    type:{type:String, unique:true},
    roles:{type:mongoose.Schema.Types.Array},
    _id:String
});

userTypeSchema.methods.getType = function(){
  return this.type;
}

mongoose.model('UserType', userTypeSchema);
