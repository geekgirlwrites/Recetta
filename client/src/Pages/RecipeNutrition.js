import React, { useState } from 'react';
import axios from 'axios';
import './RecipeNutrition.css';

export const RecipeNutrition = () => {
  const [recipe, setRecipe] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState(null);

  const APP_ID = '1e102cf1';
  const APP_KEY = '893e2894f999e38f8cf6e020d08ee230';

  const handleAnalysis = async () => {
    try {
      const response = await axios.post(
        'https://api.edamam.com/api/nutrition-details',
        {
          title: 'Sample Recipe',
          ingr: [recipe],
        },
        {
          params: {
            app_id: APP_ID,
            app_key: APP_KEY,
          },
        }
      );

      if (response.status === 200) {
        setNutritionData(response.data);
        setError(null);
      } else {
        setError('Failed to fetch nutrition information');
        setNutritionData(null);
      }
    } catch (error) {
      setError('Error fetching nutrition information');
      setNutritionData(null);
    }
  };

  const renderTable = (data, label) => {
    return (
      <div>
        <h2>{label}</h2>
        <table>
          <thead>
            <tr>
              <th>Nutrient</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((key) => (
              <tr key={key}>
                <td>{data[key].label}</td>
                <td>{data[key].quantity.toFixed(2)}</td>
                <td>{data[key].unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className='nutri_body'>
    <div>
      <div className='nutrition_body'>
      <h1 >Nutrition Analysis</h1>
      <textarea 
        placeholder="Enter recipe ingredients (comma-separated)"
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
      />
      <button className="nutri_button" onClick={handleAnalysis}>Analyze Nutrition</button>
      {error && <p>{error}</p>}
      {nutritionData && (
        <div className='output_nutri'>
          {renderTable(nutritionData.totalNutrients, 'Nutrition Information')}
          {renderTable(nutritionData.totalDaily, 'Daily Recommended Values')}
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

// export default RecipeNutrition;
