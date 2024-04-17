import express  from "express";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/users.js";

const router=express.Router();
router.post("/register",async (req,res)=>{
  //username
  //password
  const {username,password}=req.body;

  //we check if same username already exists
  const user=await UserModel.findOne({username:username});

  if(user){
    return res.json({message:"Username Already Exists!"});
  }
  //bcrypt to hash the password
  const hashedPassword=await bcrypt.hash(password,10);
  const newUser=new UserModel({username,password:hashedPassword});
  await newUser.save();
  res.json({message:"User Registered Successfully!"});
});

router.post("/login",async(req,res)=>{
  const{username,password}=req.body;
  const user = await UserModel.findOne({username});
  if(!user){
    return res.json({message:"User doesn't exists"});
  }
  const isPasswordValid=await bcrypt.compare(password,user.password);
  if(!isPasswordValid){
    return res.json({message:"Username or password is incorrect"});
  }
  //jsw tokens
  //whenver we want to authenthicate the user we use this secret so its very important
  const token=jwt.sign({id:user._id},"secret");
  res.json({token,userId:user._id});
  
});

export {router as userRouter};
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
