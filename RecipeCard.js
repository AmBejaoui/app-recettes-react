import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="recipe-image"
      />
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <div className="recipe-meta">
          <span className="badge">{recipe.category}</span>
          <span className="badge badge-time">⏱️ {recipe.time}</span>
        </div>
        <p className="recipe-difficulty">
          Difficulté: <strong>{recipe.difficulty}</strong>
        </p>
        <Link to={`/recette/${recipe.id}`} className="btn btn-primary">
          Voir la recette
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;