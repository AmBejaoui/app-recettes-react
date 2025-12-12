// src/components/RecipeForm.js
import React, { useState } from 'react';

function RecipeForm({ onAddRecipe }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Plat principal',
    time: '',
    difficulty: 'Facile',
    image: '',
    ingredients: '',
    steps: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (!formData.title || !formData.time) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      // Créer l'objet recette
      const newRecipe = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        time: formData.time,
        difficulty: formData.difficulty,
        image: formData.image || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400',
        ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
        steps: formData.steps.split('\n').filter(s => s.trim())
      };

      // Appeler la fonction du parent pour ajouter
      await onAddRecipe(newRecipe);

      // Réinitialiser le formulaire
      setFormData({
        title: '',
        category: 'Plat principal',
        time: '',
        difficulty: 'Facile',
        image: '',
        ingredients: '',
        steps: ''
      });

      alert('✅ Recette ajoutée avec succès !');

    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      alert('❌ Erreur lors de l\'ajout de la recette');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <div className="form-group">
        <label>Titre de la recette *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex: Tajine de poulet"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Catégorie</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Entrée</option>
            <option>Plat principal</option>
            <option>Dessert</option>
            <option>Boisson</option>
          </select>
        </div>

        <div className="form-group">
          <label>Temps de préparation *</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Ex: 30 minutes"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Difficulté</label>
        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option>Facile</option>
          <option>Moyen</option>
          <option>Difficile</option>
        </select>
      </div>

      <div className="form-group">
        <label>URL de l'image (optionnel)</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://exemple.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label>Ingrédients (un par ligne) *</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          rows="6"
          placeholder="Ex:&#10;500g de farine&#10;2 œufs&#10;100ml de lait"
          required
        />
      </div>

      <div className="form-group">
        <label>Étapes de préparation (une par ligne) *</label>
        <textarea
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          rows="8"
          placeholder="Ex:&#10;Mélanger la farine et les œufs&#10;Ajouter le lait progressivement&#10;Laisser reposer 30 minutes"
          required
        />
      </div>

      <button type="submit" className="btn btn-success">
        ➕ Ajouter la recette
      </button>
    </form>
  );
}

export default RecipeForm;