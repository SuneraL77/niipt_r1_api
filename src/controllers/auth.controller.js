import {UserModel} from "../models/index.js";
import { generateToken } from "../services/token.service.js";
import bcrypt from "bcrypt"

export const register= async (req,res,next) =>{
    try {
        const {username,password} = req.body;
const checkDb = await UserModel.findOne({username})
       if(!username){
       return res.status(400).json({message:"username is required"})
       }else if(!password){
        return res.status(400).json({message:"password is required"})
       }else if(checkDb){
     return res.status(400).json({message:" username is availble"})
       }
       const user = await new UserModel({
        username,
        password
       }).save();
       console.log(user)

        const access_token = await generateToken(
            { userId: user._id },
            "40d",
            process.env.ACCESS_TOKEN_SECRET
          );
          const refresh_token = await generateToken(
            { userId: user._id },
            "30d",
            process.env.REFRESH_TOKEN_SECRET
          );

          res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 10000,
          });
          console.table({ access_token, refresh_token });
          res.json({
            message: "register success",
            user: {
              id: user._id,
              name: user.username,
              token: access_token,
            },
          });
    } catch (error) {
      console.log(error)
        next(error)
    }
}
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

  
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    // Find user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate access and refresh tokens
    const access_token = await generateToken(
      { userId: user._id },
      "31d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    // Set refresh token in cookies
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 1000, // 30 days
    });

    // Send response
    res.json({
      message: "Login success",
      user: {
        id: user._id,
        name: user.username,
        token: access_token,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

