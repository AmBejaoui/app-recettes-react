// src/components/RecipeList.js
import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

function RecipeList({ recipes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Toutes');

  // Filtrer les recettes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Toutes' || recipe.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtenir les catégories uniques
  const categories = ['Toutes', ...new Set(recipes.map(r => r.category))];

  return (
    <div className="recipe-list-container">
      {/* Barre de recherche et filtres */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Rechercher une recette..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Résultats */}
      <p className="results-count">
        {filteredRecipes.length} recette(s) trouvée(s)
      </p>

      {/* Grille de recettes */}
      <div className="recipe-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="no-results">Aucune recette trouvée 😕</p>
        )}
      </div>
    </div>
  );
}

export default RecipeList;