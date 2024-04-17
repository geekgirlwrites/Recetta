import mongoose, { Schema } from "mongoose";
const UserSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
    // maxlength:20,
    // minlength:5
  },
  password:{
    type:String,
    required:true
    // minlength:8,
    // maxlength:16
  },
  savedRecipes:[
    {type:mongoose.Schema.Types.ObjectId,
    ref:"recipes"}
  ]
});

export const UserModel=mongoose.model("users",UserSchema);