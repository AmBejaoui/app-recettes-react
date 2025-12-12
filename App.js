// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import { initialRecipes } from './data/recipesData';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  // Charger les recettes depuis localStorage au démarrage
  useEffect(() => {
    try {
      const savedRecipes = localStorage.getItem('recipes');
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      } else {
        // Si rien dans localStorage, utiliser les données initiales
        setRecipes(initialRecipes);
        localStorage.setItem('recipes', JSON.stringify(initialRecipes));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error);
      setRecipes(initialRecipes);
    }
  }, []);

  // Sauvegarder dans localStorage quand recipes change
  useEffect(() => {
    if (recipes.length > 0) {
      try {
        localStorage.setItem('recipes', JSON.stringify(recipes));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
      }
    }
  }, [recipes]);

  // Fonction pour ajouter une recette
  const handleAddRecipe = async (newRecipe) => {
    try {
      setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur:', error);
      return Promise.reject(error);
    }
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home recipes={recipes} />} />
            <Route 
              path="/recette/:id" 
              element={<RecipeDetail recipes={recipes} />} 
            />
            <Route 
              path="/ajouter" 
              element={<AddRecipe onAddRecipe={handleAddRecipe} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
