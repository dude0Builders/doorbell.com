//TODO: IMPLEMENT REVIEW API.
import mongoose, { Schema } from 'mongoose';

const reviewSchema = Schema({
  userid: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
  },
  productid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Products'
  },
  rating: {
    type:Number
  },
  comment:{
    type:String
  }
})


mongoose.model('Reviews', reviewSchema, 'Reviews')
