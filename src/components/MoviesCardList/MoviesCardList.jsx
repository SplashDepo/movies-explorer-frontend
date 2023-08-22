import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';

import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import useWindowDimensions from '../../hooks/useWindowDimensions';

import { ENDPOINT_MOVIES } from '../../utils/constants';

import {
  LAPTOP_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  MOBILE_SCREEN_WIDTH,
} from '../../utils/constants.js';

function MoviesCardList({ movies, onMovieSelect, onLoad, hasUserSearched, error }) {
  const location = useLocation();
  const pathMovies = location.pathname === ENDPOINT_MOVIES;

  const windowWidth = useWindowDimensions();

  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    if (windowWidth > TABLET_SCREEN_WIDTH) {
      setVisibleCards(visibleCards + 4 * 4);
    } else if (windowWidth > MOBILE_SCREEN_WIDTH) {
      setVisibleCards(visibleCards + 4 * 2);
    } else {
      setVisibleCards(visibleCards + 5);
    }
  }, []);

  function renderCards() {
    return (
      <div className="movies-gallery__movies">
        {(movies?.length &&
          (pathMovies ? movies.slice(0, visibleCards) : movies.slice().reverse()).map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))) ||
          ''}
      </div>
    );
  }

  function setMoreCards() {
    if (windowWidth > TABLET_SCREEN_WIDTH) {
      setVisibleCards(visibleCards + 4 - (visibleCards % 4));
      return;
    }
    if (windowWidth > MOBILE_SCREEN_WIDTH) {
      setVisibleCards(visibleCards + 2 - (visibleCards % 2));
      return;
    }
    setVisibleCards(visibleCards + 2);
  }
  function renderResults() {
    if (onLoad) return <Preloader />;

    if (hasUserSearched && !movies?.length && !error?.moviesResponse) {
      return <p className="paragraph">Ничего не найдено</p>;
    }

    if (hasUserSearched && !movies?.length && error?.moviesResponse) {
      return <p className="paragraph paragraph_type_error">{error?.moviesResponse}</p>;
    }

    return renderCards();
  }

  return (
    <section className="movies-gallery" aria-label="Галерея с карточками фильмов">
      {renderResults()}

      {visibleCards < movies?.length && pathMovies && (
        <button
          className="movies-gallery__btn-more"
          type="button"
          aria-label="Отображение новых карточек с фильмами в галерее"
          onClick={() => setMoreCards()}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;