import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, Redirect, useNavigate } from 'react-router-dom';

import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Profile from '../Profile/Profile.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import useDisplayMovies from '../../utils/useDisplayMovies';
import useDeviceResize from '../../utils/useDeviceResize';
import useOfFilterAndSearch from '../../utils/useOfFilterAndSearch';

function App() {
  const [islogOn, setlogOn] = useState(false);
  const [isMovies, setIsMovies] = useState([]);
  const [storedMovies, setStoredMovies] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(null);
  const [isErrorMovies, setErrorMovies] = React.useState(null);
  const navigate = useNavigate();

  const {
    width,
    checkDeviceWidth,
    changeDeviceWidth,
  } = useDeviceResize();

  const {
    searchedMovies,
    searchValue,
    storageSearchValue,
    searchedMoviesSaved,
    isIncludedFilter,
    isSavedMoviesFilterShort,
    setSearchedMovies,
    setSearchValue,
    setIncludedFilter,
    setSavedMoviesFilterShort,
    handlehMoviesSearc,
    handleSavedMoviesSearch,
    handleFilterMovies,
    handleSavedMoviesFilter,
    handleSearchValue,
    handleStorageSearchValue,
    clearMoviesSaved,
    handleSearchingFinish,
  } = useOfFilterAndSearch({ isMovies, storedMovies, setErrorMovies, setIsSearching });

  const {
    isVisibleMovies,
    isAllMovies,
    setIsVisibleMovies,
    handleVisibleMovies,
    handleResizeOfVisibleMovies,
    handleOtherVisibleMovies,
    countVisibleMovies,
  } = useDisplayMovies({ width, searchedMovies });

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
    setIsMovies(JSON.parse(localStorage.getItem("movies")));
    checkDeviceWidth();
    changeDeviceWidth();
    setIncludedFilter(JSON.parse(localStorage.getItem("isIncludedFilter")) || false);
    setSavedMoviesFilterShort(JSON.parse(localStorage.getItem("isSavedMoviesFilterShort")) || false);
    setSearchValue("");
  }, []);

  // React.useEffect(() => {
  //   setlogOn && getMoviesSaved();
  // }, [setlogOn]);

  useEffect(() => {
    if (searchedMovies) {
      if (searchedMovies.length === 0) {
        setIsVisibleMovies(searchedMovies);
      } else {
        handleVisibleMovies()
      }
    }
  }, [searchedMovies]);

  useEffect(() => {
    if (isVisibleMovies && isVisibleMovies.length !== 0) {
      countVisibleMovies();
    }
  }, [isVisibleMovies]);

  useEffect(() => {
    searchedMovies && isVisibleMovies && handleResizeOfVisibleMovies();
  }, [width]);

  useEffect(() => {
    if (Array.isArray(storedMovies)) {
      handleSavedMoviesSearch(storageSearchValue);
    }
  }, [searchValue, storedMovies, isSavedMoviesFilterShort, storageSearchValue]);

  return (
    <div className="page">
      <Header islogOn={islogOn} />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/sign-up" element={<Register onSubmit={handleSignUp} />} />
        <Route exact path="/sign-in" element={<Login onSubmit={handleSignIn} />} />
        <Route
          exact path="/movies"
          element={<Movies
            islogOn={islogOn}
            isAllMovies={isAllMovies}
            isErrorMovies={isErrorMovies}
            isSearching={isSearching}
            storedMovies={storedMovies}
            isIncludedFilter={isIncludedFilter}
            isVisibleMovies={isVisibleMovies}
            onMoviesSearch={handleSearchValue}
            onMoviesFilter={handleFilterMovies}
            onOtherVisibleMovies={handleOtherVisibleMovies}
            onSeeMovies={handleOtherVisibleMovies}
            onSearchingFinish={handleSearchingFinish}
          />}
        />
        <Route exact path="/profile" element={<Profile onSubmit={handleProfile} onSignOut={handleSignOut} />} />
        <Route exact path="/saved-movies" element={<SavedMovies isMovies={isMovies} />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
