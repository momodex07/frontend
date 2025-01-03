import React, { useState, useEffect } from 'react';
import { getFilms, updateFilm, deleteFilm } from '../services/api';

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [editingFilmId, setEditingFilmId] = useState(null); // ID du film en cours de modification
  const [updatedFilm, setUpdatedFilm] = useState({}); // Données modifiées du film
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getFilms();
        if (data && Array.isArray(data)) {
          setFilms(data);
        } else {
          console.error('Données invalides reçues :', data);
          setError('Données invalides reçues du serveur.');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des films :', err);
        setError('Impossible de récupérer les films.');
      }
    };

    fetchFilms();
  }, []);

  // Fonction pour gérer les modifications des champs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFilm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour soumettre les modifications
  const handleUpdateSubmit = async (id) => {
    const result = await updateFilm(id, updatedFilm);
    if (result) {
      alert('Film mis à jour avec succès');
      setFilms((prevFilms) =>
        prevFilms.map((film) =>
          film._id === id ? { ...film, ...updatedFilm } : film
        )
      );
      setEditingFilmId(null); // Fermer le formulaire
    }
  };

  // Fonction pour annuler la modification
  const handleCancelEdit = () => {
    setEditingFilmId(null);
    setUpdatedFilm({});
  };

  // Fonction pour supprimer un film
  const handleDelete = async (id) => {
    const result = await deleteFilm(id);
    if (result) {
      alert('Film supprimé avec succès');
      setFilms((prevFilms) => prevFilms.filter((film) => film._id !== id));
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Liste des Films</h2>
      <ul>
        {films.map((film) => (
          <li key={film._id}>
            {editingFilmId === film._id ? (
              // Formulaire de modification
              <div>
                <input
                  type="text"
                  name="titre"
                  defaultValue={film.titre}
                  onChange={handleInputChange}
                  placeholder="Titre"
                />
                <input
                  type="number"
                  name="annee"
                  defaultValue={film.annee}
                  onChange={handleInputChange}
                  placeholder="Année"
                />
                <input
                  type="text"
                  name="genre"
                  defaultValue={film.genre}
                  onChange={handleInputChange}
                  placeholder="Genre"
                />
                <input
                  type="text"
                  name="realisateur"
                  defaultValue={film.realisateur}
                  onChange={handleInputChange}
                  placeholder="Réalisateur"
                />
                <textarea
                  name="synopsis"
                  defaultValue={film.synopsis}
                  onChange={handleInputChange}
                  placeholder="Synopsis"
                />
                <button onClick={() => handleUpdateSubmit(film._id)}>
                  Enregistrer
                </button>
                <button onClick={handleCancelEdit}>Annuler</button>
              </div>
            ) : (
              // Affichage des détails du film
              <div>
                <strong>{film.titre}</strong> ({film.annee}) - {film.genre} <br />
                <em>Réalisé par : {film.realisateur}</em> <br />
                {film.synopsis}
                <br />
                <button onClick={() => setEditingFilmId(film._id)}>
                  Modifier
                </button>
                <button onClick={() => handleDelete(film._id)}>Supprimer</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmList;
