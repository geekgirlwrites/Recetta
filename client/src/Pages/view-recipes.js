// Updated ViewRecipes component
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserId } from '../hooks/useGetUserId';
import './view-recipes.css';

export const ViewRecipes = () => {
  const userID = useGetUserId();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies("access_token");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        //const response = await axios.get("http://localhost:3001/recipes");
        const response = await axios.get("/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        //const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        const response = await axios.get(`/recipes/savedRecipes/ids/${userID}`);

        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      // const response = await axios.put("http://localhost:3001/recipes", {
      //   recipeID,
      //   userID,
      // }
      const response = await axios.put("/recipes", {
        recipeID,
        userID,
      }
      , 
      {
        headers: { authorization: cookies.access_token },
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-recipes-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by dish name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="view-recipes-cont2">
        <h2 className="view-recipes-title" style={{ color: 'white' }}>Recipes</h2>
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-item">
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                className="save-button"
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingre, index) => (
                <li key={index}>{ingre}</li>
              ))}
            </ul>
            <div className="recipe-instructions">
              <h3>Instructions:</h3>
              {recipe.instructions.split("\n").map((instruction, index) => (
                <p key={index} style={{ color: 'black' }}>{instruction}</p>
              ))}
            </div>
            <img
              className="recipe-image"
              src={recipe.imageURL}
              alt={recipe.name}
            />
            <p className="cooking-time">
              Cooking Time: {recipe.cookingTime} (minutes)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
