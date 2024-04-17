import './App.css';
import { CreateRecipes } from './Pages/create-recipe';
import { Home } from './Pages/home';
import {Auth } from './Pages/auth';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import { SavedRecipes } from './Pages/saved-recipes';
import { Navbar } from './components/navbar';
import { ViewRecipes } from './Pages/view-recipes';
import { Register } from './Pages/register';
import { FromIngredients } from './Pages/fromingredients';
import { FromName } from './Pages/fromname';
import { FromImage } from './Pages/fromimage';
import { AboutUs } from './Pages/aboutus';
import { RecipeNutrition } from './Pages/RecipeNutrition';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/auth" element={<Auth></Auth>}></Route>
          <Route path="/create-recipe" element={<CreateRecipes></CreateRecipes>}></Route>
          <Route path="/saved-recipes" element={<SavedRecipes></SavedRecipes>}></Route>
          <Route path="/view-recipes" element={<ViewRecipes></ViewRecipes>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/fromingredients" element={<FromIngredients></FromIngredients>}></Route>
          <Route path="/fromname" element={<FromName></FromName>}></Route>
          <Route path="/fromimage" element={<FromImage></FromImage>}></Route>
          <Route path="/RecipeNutrition" element={<RecipeNutrition></RecipeNutrition>}></Route>
          <Route path="/aboutus" element={<AboutUs></AboutUs>}></Route>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
