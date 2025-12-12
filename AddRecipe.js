// src/pages/AddRecipe.js
import React from 'react';
import RecipeForm from '../components/RecipeForm';

function AddRecipe({ onAddRecipe }) {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>➕ Ajouter une nouvelle recette</h1>
          <p>Partagez votre recette préférée avec la communauté</p>
        </div>
        <RecipeForm onAddRecipe={onAddRecipe} />
      </div>
    </div>
  );
}

export default AddRecipe;