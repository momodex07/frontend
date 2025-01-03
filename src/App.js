import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FilmList from './components/FilmList';
import AddFilm from './components/AddFilm';

function App() {
  return (
    <Router>
      <div>
        <h1>Application de Gestion de Films</h1>
        <nav>
          <ul>
            <li><Link to="/">Liste des Films</Link></li>
            <li><Link to="/add">Ajouter un Film</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<FilmList />} />
          <Route path="/add" element={<AddFilm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
