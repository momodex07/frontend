import React, { useState } from 'react';
import { addFilm } from '../services/api';

const AddFilm = () => {
  const [titre, setTitre] = useState('');
  const [annee, setAnnee] = useState('');
  const [genre, setGenre] = useState('');
  const [realisateur, setRealisateur] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFilm = { titre, annee, genre, realisateur, synopsis };
    try {
      await addFilm(newFilm);
      alert('Film ajouté avec succès !');
      setTitre('');
      setAnnee('');
      setGenre('');
      setRealisateur('');
      setSynopsis('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du film', error);
      alert('Une erreur est survenue.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un Film</h2>
      <div>
        <label>Titre :</label>
        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />
      </div>
      <div>
        <label>Année :</label>
        <input type="number" value={annee} onChange={(e) => setAnnee(e.target.value)} required />
      </div>
      <div>
        <label>Genre :</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <div>
        <label>Réalisateur :</label>
        <input type="text" value={realisateur} onChange={(e) => setRealisateur(e.target.value)} />
      </div>
      <div>
        <label>Synopsis :</label>
        <textarea value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddFilm;
