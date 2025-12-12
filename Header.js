import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">🍳 Mes Recettes</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/ajouter" className="nav-link">Ajouter une recette</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;