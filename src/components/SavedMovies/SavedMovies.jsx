import React, { useState } from "react";

import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Footer from "../Footer/Footer.jsx";

function SavedMovies({
  movies,
  onSearch,
  searchFormValue,
  setIsSearchRequestInProgress,
  hasUserSearched,
  onMovieSelect,
  onFilter,
  isFilterCheckboxChecked,
}) {
  const [prevValueSavedMovies, setPrevValueSavedMovies] = useState("");

  return (
    <>
      <main>
        <SearchForm
          onSearch={onSearch}
          searchFormValue={searchFormValue}
          setIsSearchRequestInProgress={setIsSearchRequestInProgress}
          onFilter={onFilter}
          isFilterCheckboxChecked={isFilterCheckboxChecked}
          prevValue={prevValueSavedMovies}
          setPrevValue={setPrevValueSavedMovies}
        />
        <MoviesCardList
          movies={movies}
          hasUserSearched={hasUserSearched}
          onMovieSelect={onMovieSelect}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;