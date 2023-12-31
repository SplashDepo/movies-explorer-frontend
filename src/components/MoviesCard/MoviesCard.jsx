import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props) {
  const location = useLocation();
  const isLocationMoviesSaved = location.pathname === '/saved-movies';

  const [isAddCard, setAddACardSaved] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  let cardSaveButtonClassName = `card__emotion ${isAddCard ? "card__emotion_active" : "card__emotion"}`;

  function handleAddSaved() {
    isAddCard ? setAddACardSaved(false) : setAddACardSaved(true);
  }

  function handleDeleteSaved() {
    setAddACardSaved(false);
  }

  function handleDeleteButtonVisible() {
    setIsDelete(true);
    return;
  }

  function handleDeleteeButtonHidden() {
    setIsDelete(false);
    return;
  }

  function handleMovieLength() {
    const duration = {};
    duration['hours'] = Math.floor(props.movie.duration / 60);
    duration['minutes'] = props.movie.duration % 60;
    return duration;
  }

  return (
    <li onMouseOver={handleDeleteButtonVisible} onMouseLeave={handleDeleteeButtonHidden} className="card">
      <a
        href={props.movie.trailerLink}
        target="_blank"
        className="card__trailer"
        rel="noopener noreferrer"
      >
        <img
          className="card__image"
          src={props.movie.link}
          alt={props.movie.name} />
      </a>

      <div className="card__description">
        <div className="card__info">
          <h2 className="card__title">{props.movie.name}</h2>
          {!isLocationMoviesSaved &&
            <button
              type="button"
              aria-label="Кнопка добавления в сохраненные"
              className={cardSaveButtonClassName}
              onClick={handleAddSaved}
            ></button>
          }
          {isLocationMoviesSaved &&
            <button
              type="button"
              aria-label="Кнобка удаления из сохраненных"
              className={`card__close ${(isDelete || isMobile) ? "card__close_visible" : "card__close_hidden"} `}
              onClick={handleDeleteSaved}
            ></button>
          }
        </div>
        <p className="card__length">{`${handleMovieLength().hours !== 0 ? `${handleMovieLength().hours}ч ` : ""} ${handleMovieLength().minutes}м`}
        </p>
      </div>

    </li>
  );
}

export default MoviesCard;