import { useEffect, useState } from "react"
import axios from "axios";
import {useCookies} from 'react-cookie';
import {useGetUserId} from '../hooks/useGetUserId'
import './saved-recipes.css'
export const SavedRecipes = () => {
  const userID=useGetUserId();
  const [savedRecipes,setSavedRecipes]=useState([]);
  const [cookies,_]=useCookies("access_token");
  useEffect(()=>{
    const fetchSavedRecipes = async () =>{
      try {
        //const response=await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        const response=await axios.get(`/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      
      } catch (error) {
        
      }
    }
    fetchSavedRecipes();
  },[userID]);


  // const unsaveRecipe = async (recipeID) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:3001/recipes/savedRecipes/${recipeID}`,
  //       {
  //         headers: {
  //           authorization: cookies.access_token
  //         }
  //       }
  //     );
  //     setSavedRecipes(response.data.savedRecipes);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle errors or provide user feedback here
  //   }
  // };
  

  return(
    <div className="saved-recipes">
      <h1 style={{color:'white'}}>Saved Recipes</h1>
      <div className="recipe-grid">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h2 className="recipe-name">{recipe.name}</h2>
            <div className="recipe-image">
              <img src={recipe.imageURL} alt={recipe.name} />
            </div>
            <div className="recipe-ingredients">
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="recipe-instructions" >
              <h3 style={{color:'black'}}>Instructions</h3>
              <p style={{color:'black'}}>{recipe.instructions}</p>
            </div>
            <p style={{color:'blue'}}>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </div>
        ))}
      </div>
    </div>
  )
}