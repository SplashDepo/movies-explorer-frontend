import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, Redirect, useNavigate } from 'react-router-dom';
import movies from '../../utils/movies.js';

import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Profile from '../Profile/Profile.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
let numberMovies = 0;

function App() {
  const [islogOn, setlogOn] = useState(false);
  const [isMovies, setIsMovies] = useState([]);
  const [allMovies, setAllMovies] = useState(false);
  const navigate = useNavigate();

  function handleSignIn() {
    setlogOn(true);
    navigate.push("/movies");
  }

  function handleProfile() { }

  function handleSignUp() {
    handleSignIn();
  }

  function handleSignOut() {
    setlogOn(false);
    navigate.push("/");
  }

  useEffect(() => {
    setIsMovies(movies.filter((movie, index) => index < 7));
  }, []);

  useEffect(() => {
    countsSeeMovies();
  }, [isMovies]);

  function handleSeeMovies() {
    numberMovies++;
    setIsMovies([
      ...isMovies,
      ...movies.filter(
        (movie, index) =>
          index >= (7 * numberMovies) && index < (7 * (numberMovies + 1))
      ),
    ]);
  }

  function countsSeeMovies() {
    if (setIsMovies.length === movies.length) setAllMovies(true);
  }

  return (
    <div className="page">
      <Header islogOn={islogOn} />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/sign-up" element={<Register onSubmit={handleSignUp} />} />
        <Route exact path="/sign-in" element={<Login onSubmit={handleSignIn} />} />
        <Route exact path="/movies" element={<Movies isMovies={isMovies} allMovies={allMovies} onSeeMovies={handleSeeMovies} />} />
        <Route exact path="/profile" element={<Profile onSubmit={handleProfile} onSignOut={handleSignOut} />} />
        <Route exact path="/saved-movies" element={<SavedMovies isMovies={isMovies} />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
