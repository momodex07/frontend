import axios from 'axios';

const API_URL = 'https://backend-service-zuhh.onrender.com'; // Remplacez par l'URL de votre API déployée

export const getFilms = async () => {
  try {
    const response = await axios.get(`${API_URL}/films`);
    console.log('Réponse complète Axios :', response);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des films', error);
    return null;
  }
};

export const addFilm = async (film) => {
  try {
    const response = await axios.post(`${API_URL}/films`, film);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un film', error);
  }
};

export const updateFilm = async (id, updatedFilm) => {
  try {
    const response = await axios.put(`${API_URL}/films/${id}`, updatedFilm);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du film', error);
  }
};

export const deleteFilm = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/films/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du film', error);
  }
};

