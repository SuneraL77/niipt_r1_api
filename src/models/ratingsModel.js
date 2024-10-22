import mongoose from "mongoose";

import bcrypt from "bcrypt";
const { ObjectId } = mongoose.Schema.Types;
const ratingSchema = mongoose.Schema(
  {
  user:{
    type:ObjectId,
    ref:"UserModel"
  },
  emoji:{
    type:String,
  },
  description:{
    type:String,
  },
  userType:{
    type:String
  }
  
  },
  {
    collection: "ratings",
    timestamps: true,
  }
);

const RatingModel =
  mongoose.models.RatingModel || mongoose.model("RatingModel", ratingSchema);

export default RatingModel;
