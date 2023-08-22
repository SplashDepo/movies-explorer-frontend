import React, { useState } from "react";


import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({
  movies,
  onSearch,
  setIsSearchRequestInProgress,
  searchFormValue,
  hasUserSearched,
  onFilter,
  isFilterCheckboxChecked,
  onMovieSelect,
  onLoad,
  error,
}) {
  const [prevValueMovies, setPrevValueMovies] = useState("");

  return (
    <>
      <main className="container">
        <SearchForm
          onSearch={onSearch}
          setIsSearchRequestInProgress={setIsSearchRequestInProgress}
          searchFormValue={searchFormValue}
          onFilter={onFilter}
          isFilterCheckboxChecked={isFilterCheckboxChecked}
          valueRequired={true}
          prevValue={prevValueMovies}
          setPrevValue={setPrevValueMovies}
        />
        <MoviesCardList
          movies={movies}
          onMovieSelect={onMovieSelect}
          onLoad={onLoad}
          hasUserSearched={hasUserSearched}
          error={error}
        />
      </main>
      <Footer />
    </>
  );
}


export default Movies;