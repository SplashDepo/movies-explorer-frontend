import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css"

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import { ENDPOINT_SAVED_MOVIES } from "../../utils/constants";

function SearchForm({
  onSearch,
  setIsSearchRequestInProgress,
  searchFormValue,
  onFilter,
  isFilterCheckboxChecked,
  valueRequired,
  prevValue,
  setPrevValue,
}) {
  const location = useLocation();

  const movie = useRef("");
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);
  function handleSubmit(evt) {
    evt.preventDefault();

    const { value } = movie.current;
    if (value === prevValue) return;

    if (!value.trim() && location.pathname !== ENDPOINT_SAVED_MOVIES) {
      setIsSearchFormValid(false);
    } else {
      setIsSearchFormValid(true);
      onSearch(value);
      setIsSearchRequestInProgress(true);
      setPrevValue(value);
    }
  }

  return (
    <section className="search" aria-label="Поисковая форма фильмов">
      <div className="wrapper search__wrapper">
        <form
          className="search-film"
          name="search-film"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="search-film__wrapper">
            <input
              className="search-film__input"
              ref={movie}
              type="text"
              placeholder="Фильм"
              defaultValue={searchFormValue}
              required={valueRequired ?? false}
            />
            <button
              className="search-film__btn"
              type="submit"
              aria-label="Поиск фильмов"
            >Найти</button>
          </div>
          <span
            className={`search-film__error${(!isSearchFormValid && " search-film__error_visible") || ""}`}
          >
            Нужно ввести ключевое слово
          </span>
        </form>
        <FilterCheckbox
          onFilter={onFilter}
          isFilterCheckboxChecked={isFilterCheckboxChecked}
        />
      </div>
    </section>
  );
}

export default SearchForm;