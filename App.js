// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ref, get, set, push } from 'firebase/database';
import { database } from './firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import { initialRecipes } from './data/recipesData';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les recettes depuis Firebase
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const recipesRef = ref(database, 'recipes');
        const snapshot = await get(recipesRef);
        
        if (snapshot.exists()) {
          // Convertir l'objet Firebase en tableau
          const recipesData = [];
          snapshot.forEach((childSnapshot) => {
            recipesData.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          setRecipes(recipesData);
        } else {
          // Si aucune recette dans Firebase, ajouter les recettes initiales
          console.log('Aucune recette trouvée, ajout des recettes initiales...');
          
          for (const recipe of initialRecipes) {
            const newRecipeRef = push(recipesRef);
            await set(newRecipeRef, recipe);
          }
          
          // Recharger les recettes
          const newSnapshot = await get(recipesRef);
          const recipesData = [];
          newSnapshot.forEach((childSnapshot) => {
            recipesData.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          setRecipes(recipesData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des recettes:', error);
        // En cas d'erreur, utiliser les données locales
        setRecipes(initialRecipes);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Fonction pour ajouter une recette
  const handleAddRecipe = async (newRecipe) => {
    try {
      // Ajouter à Firebase
      const recipesRef = ref(database, 'recipes');
      const newRecipeRef = push(recipesRef);
      await set(newRecipeRef, newRecipe);
      
      // Ajouter à l'état local avec l'ID de Firebase
      const recipeWithId = { ...newRecipe, id: newRecipeRef.key };
      setRecipes(prevRecipes => [...prevRecipes, recipeWithId]);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      return Promise.reject(error);
    }
  };

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem',
        color: '#ff6b6b',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '3rem' }}>🔥</div>
        <div>Chargement des recettes depuis Firebase...</div>
      </div>
    );
  }

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
