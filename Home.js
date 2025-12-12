// src/pages/Home.js
import React from 'react';
import RecipeList from '../components/RecipeList';

function Home({ recipes }) {
  return (
    <div className="page">
      <div className="container">
        <div className="hero">
          <h2>Bienvenue dans votre livre de recettes ! 👨‍🍳</h2>
          <p>Découvrez et partagez vos meilleures recettes</p>
        </div>
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
}

export default Home;