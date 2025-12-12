// src/pages/RecipeDetail.js
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function RecipeDetail({ recipes }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Trouver la recette par ID
  const recipe = recipes.find(r => r.id === parseInt(id));

  // Si la recette n'existe pas
  if (!recipe) {
    return (
      <div className="page">
        <div className="container">
          <div className="error-message">
            <h2>❌ Recette non trouvée</h2>
            <Link to="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-back"
        >
          ← Retour
        </button>

        <div className="recipe-detail">
          <div className="recipe-detail-header">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="recipe-detail-image"
            />
            <div className="recipe-detail-info">
              <h1>{recipe.title}</h1>
              <div className="recipe-meta">
                <span className="badge">{recipe.category}</span>
                <span className="badge badge-time">⏱️ {recipe.time}</span>
                <span className="badge badge-difficulty">
                  📊 {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>

          <div className="recipe-detail-content">
            <div className="ingredients-section">
              <h2>🛒 Ingrédients</h2>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span className="checkmark">✓</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="steps-section">
              <h2>👩‍🍳 Étapes de préparation</h2>
              <ol className="steps-list">
                {recipe.steps.map((step, index) => (
                  <li key={index}>
                    <strong>Étape {index + 1}</strong>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;