import React from 'react';
import { useLocation } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './MoviesCard.css';

function MoviesCard({ movie, onMovieSelect }) {
  const location = useLocation();
  const islocationSaved = location.pathname === '/saved-movies';
  const { nameRU, duration, trailerLink, image, selected } = movie;

  function countTime(duration) {
    const time = duration / 60;
    const hours = Math.floor(time);
    const minutes = duration - hours * 60;

    if (hours && minutes) return `${hours}ч ${minutes}м`;

    return hours ? `${hours}ч` : `${minutes}м`;
  }

  const windowWidth = useWindowDimensions();

  return (
    <article className="movies-card">
      <a className="link movies-card__link" href={trailerLink} rel="noreferrer" target="_blank">
        <img
          className="movies-card__photo"
          src={(image?.url && `https://api.nomoreparties.co${image?.url}`) || image}
          alt={`Постер фильма "${nameRU}"`}
        />
      </a>
      <div className="movies-card__description">
        <h2 className="movies-card__heading">{nameRU}</h2>
        <button
          className={` movies-card__btn-favourite ${(selected && ' movies-card__btn-favourite_active') || ''
            } ${islocationSaved ? 'movies-card__btn-favourite_deleted' : ''}`}
          type="button"
          aria-label="Добавление карточки с фильмом в избранные"
          onClick={(evt) => onMovieSelect(evt, movie)}></button>
      </div>
      <span className="movies-card__duration">{countTime(duration)}</span>
    </article>
  );
}

export default MoviesCard;