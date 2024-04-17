import { useState } from "react";
import axios, { Axios } from 'axios';
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie';
import './create-recipe.css';
export const CreateRecipes = () => {
  const userID=useGetUserId();
  const navigate=useNavigate();
  const [cookies,_]=useCookies("access_token");
  const [recipe,setRecipe]=useState({
    name:"",
    ingredients:[],
    instructions:"",
    cookingTime:0,
    userOwner:userID
  });
  
  const handleChange=(event)=>{
    const{name,value}=event.target;
    setRecipe({...recipe,[name]:value});
  };

  const addIngredients = () =>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});
  };

  const handleIngredientChange = (event,idx) => {
    const {value}=event.target;
    const ingredients=recipe.ingredients;
    ingredients[idx]=value;
    setRecipe({...recipe,ingredients:ingredients});

  }
  //console.log(recipe);
  const onSubmit=async(event)=>{
    event.preventDefault();
    // try{
    //   await axios.post("http://localhost:3001/recipes",recipe,{
    //     headers:{authorization: cookies.access_token},
    //   });
    try{
      await axios.post("/recipes",recipe,{
        headers:{authorization: cookies.access_token},
      });
      alert("Recipe Created");
      navigate("/");
    }catch(err){
      //console.log(err);
    }
  }

  return(
    <div className="create-recipe-body">
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <div className="create-recipe-group">
          <label htmlFor="name"> Name: </label>
          <input type="text" id="name" name="name" onChange={handleChange}></input>
        </div>
        <div className="create-recipe-group">
          <label htmlFor="ingredients"> Ingredients: </label>
          {recipe.ingredients.map((ingredients,idx)=>(
            <div><input key={idx} 
            type="text" 
            name="ingredients" 
            value={ingredients}
            onChange={(event)=>handleIngredientChange(event,idx)}>
            </input><br></br></div>
          ))}
          <button onClick={addIngredients} type="button">Add Ingredients</button>
        </div>
        <div className="create-recipe-group">
          <label htmlFor="instructions"> Instructions: </label>
        <textarea type="text" id="instructions" name="instructions" onChange={handleChange}></textarea>
      </div>
        <div className="create-recipe-group">
          <label htmlFor="imageURL"> Image URL: </label>
        <input type="text" id="imageURL" name="imageURL" onChange={handleChange}></input>
      </div>
        <div className="create-recipe-group">
          <label htmlFor="cookingTime"> Cooking Time: </label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}></input>
      </div>
      <button type="submit">Create Recipe</button>
      </form>
    </div>
    </div>
  )
}
