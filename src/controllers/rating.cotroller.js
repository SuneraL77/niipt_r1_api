
import {RatingModel} from "../models/index.js"

export const createRatingModel = async (req,res) =>{
    const {
      emoji,
      description,
      userType} = req.body
      const user = req.user.userId
      if(!user){
        return res.status(400).json({message:"please select the users"})
      }
      const ratings = await new RatingModel({
        user,
        emoji,
        description,
        userType
      }).save()
     return res.status(200).json({message:"!Cs"})
}


export const getRatings = async (req,res) =>{
      const user = req.user.userId
      if(!user){
        return res.status(400).json({message:"please select the users"})
      }
      const ratings = await RatingModel.find({user:user})
     return res.status(200).json(ratings)
}


export const filterRatings = async (req,res) =>{
    const{userType}= req.body
    const user = req.user.userId
    if(!user){
      return res.status(400).json({message:"please select the users"})
    }
    const ratings = await RatingModel.find({user:user,userType:userType})
   return res.status(200).json(ratings)
}