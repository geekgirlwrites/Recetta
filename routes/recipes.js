import { RecipeModel } from "../models/recipes.js";
import express from 'express';
import { UserModel } from "../models/users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/",async (req,res)=>{
  try{
    const response= await RecipeModel.find({});
    res.json(response);
  }catch(err){
    res.json(err);
  }
});


router.post("/",verifyToken,async (req,res)=>{
  const recipe = new RecipeModel(req.body);
  try{
    const response= await recipe.save();
    res.json(response);
  }catch(err){
    res.json(err);
  }
});

router.put("/",verifyToken, async (req, res) => {
  const recipe = await RecipeModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/savedRecipes/ids/:userId",async(req,res)=>{
  try {
    const user=await UserModel.findById(req.params.userId);
    res.json({savedRecipes:user?.savedRecipes});
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/:userId",async(req,res)=>{
  try {
    const user=await UserModel.findById(req.params.userId);
    const savedRecipes=await RecipeModel.find({
      _id:{$in:user.savedRecipes},
    });
    res.json({savedRecipes});
  } catch (error) {
    res.json(error);
  }
});
export {router as recipesRouter};