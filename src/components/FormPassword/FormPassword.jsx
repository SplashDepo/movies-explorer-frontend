import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FormPassword.css';

function FormPassword() {
  const location = useLocation();
  const islocationProfile = location.pathname === "/profile";
  const [isCorrectly, setIsCorrectly] = useState(true);

  function handleChange() {

  }

  return (
    <div className="info-container">
      <label htmlFor="password" className={`info-container__label ${!islocationProfile ? "info-container__label_active" : ""}`}>Пароль</label>

      <input
        id="password"
        name="password"
        type="password"
        className={`info-container__input ${!islocationProfile ? "info-container__input_active" : ""} ${!isCorrectly ? "info-container__input_error" : ""}`}
        required
        minLength="6"
        maxLength="20"
        onChange={handleChange}
      />
      <span className={`info-container__error ${!isCorrectly ? "info-container__error_active" : ""}`}>Что-то пошло не так...</span>
    </div>
  );
}

export default FormPassword;