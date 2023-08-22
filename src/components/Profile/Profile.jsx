import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

import CurrentUserContext from '../../contexts/CurrentUserContext.js';

import useFormWithValidation from '../../hooks/useFormWithValidation.js';

import { PATTERN_EMAIL, ENDPOINT_ROOT, PATTERN_USERNAME } from '../../utils/constants';
import { VALIDATION_MESSAGES } from '../../utils/validation';

function Profile({
  setIsCurrentUserLoggedIn,
  setSearchFormValueSavedMovies,
  setIsFilterCheckboxSavedMoviesChecked,
  setCurrentUser,
  onUpdate,
  onLoad,
  isBtnSaveVisible,
  setIsBtnSaveVisible,
  onSuccessMessages,
  setSuccessMessages,
  error,
  setErrorMessages,
}) {
  const [prevValues, setPrevValues] = useState({});

  const navigate = useNavigate();

  const currentUser = useContext(CurrentUserContext);
  const { email, name } = currentUser;

  const { values, setValues, errors, isValid, setIsValid, handleChange } = useFormWithValidation();

  useEffect(() => {
    setValues({ email, name });

    setIsBtnSaveVisible(false);
    setSuccessMessages('');
    setErrorMessages({ updatingUserInfoResponse: '' });
  }, [navigate]);

  function showSaveBtn({ target }) {
    setIsBtnSaveVisible(true);
    setSuccessMessages('');

    const data = {};
    Array.from(target.closest('.profile__form').children[0].children).forEach((wrapper) => {
      const input = wrapper.children[1];

      data[input.name] = input.value;
    });

    setPrevValues(data);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, name } = values;

    onUpdate({
      email: email.trim().replace(/\s/g, ''),
      name: name.trim().replace(/\s+/g, ' '),
    });

    setIsValid(false);
  }

  function loginOut() {
    localStorage.clear();
    setCurrentUser({
      _id: '',
      email: '',
      name: '',
    });
    setSearchFormValueSavedMovies('');
    setIsFilterCheckboxSavedMoviesChecked(false);
    navigate(ENDPOINT_ROOT, { replace: true });
    setIsCurrentUserLoggedIn(false);
  }

  return (
    <div className="profile container">
      <h1 className="profile__heading">Привет, {name}!</h1>
      <form className="profile__form" name="profile" onSubmit={handleSubmit} noValidate>
        <fieldset className="profile__fieldset">
          <div className="profile__input-wrapper">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className="profile__input"
              id="name"
              name="name"
              type="text"
              autoComplete="on"
              value={values?.name || ''}
              required
              onChange={handleChange}
              pattern={PATTERN_USERNAME}
              disabled={isBtnSaveVisible ? false : true}
            />
          </div>

          <div className="profile__input-wrapper">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="profile__input"
              id="email"
              name="email"
              type="text"
              autoComplete="on"
              value={values?.email || ''}
              required
              onChange={handleChange}
              pattern={PATTERN_EMAIL}
              disabled={isBtnSaveVisible ? false : true}
            />
            <span
              className={`error${((errors?.email || errors?.name) && ' error_visible') || ''
                } error_type_server-response`}>
              {errors?.name && VALIDATION_MESSAGES.frontend.name + '\n'}
              {errors?.email && VALIDATION_MESSAGES.frontend.email}
            </span>
          </div>
        </fieldset>
        <div className="profile__wrapper-btn">
          <span
            className={`error${(error?.updatingUserInfoResponse && ' error_visible') || ''
              } error_type_server-response`}>
            {error?.updatingUserInfoResponse}
          </span>
          <span
            className={`success${(onSuccessMessages?.updatingUserInfoResponse &&
                !error?.updatingUserInfoResponse &&
                ' success_visible') ||
              ''
              }`}>
            {onSuccessMessages?.updatingUserInfoResponse}
          </span>

          {isBtnSaveVisible ? (
            <button
              className=" btn-entry btn-save"
              type="submit"
              aria-label="Сохранение данных профиля"
              disabled={
                !isValid ||
                onLoad ||
                (prevValues.email === values.email && prevValues.name === values.name)
              }>
              {onLoad ? 'Сохранение...' : 'Сохранить'}
            </button>
          ) : (
            <button
              className=" btn-profile"
              type="button"
              aria-label="Редактирование данных профиля"
              onClick={(evt) => showSaveBtn(evt)}>
              Редактировать
            </button>
          )}
        </div>
      </form>

      {!isBtnSaveVisible && (
        <button
          className="btn-profile-exit"
          type="button"
          aria-label="Выход из личного кабинета пользователя"
          onClick={() => loginOut()}>
          Выйти из аккаунта
        </button>
      )}
    </div>
  );
}

export default Profile;