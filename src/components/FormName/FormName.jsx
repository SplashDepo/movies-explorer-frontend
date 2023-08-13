import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../FormPassword/FormPassword.css';

function FormName() {
  const location = useLocation();
  const islocationProfile = location.pathname === "/profile";
  const [isCorrectly, setIsCorrectly] = useState(true);

  function handleChange() {

  }

  return (
    <div className={`info-container ${islocationProfile ? "info-container_profile" : ""}`}>
      <label htmlFor="name" className={`info-container__label ${!islocationProfile ? "info-container__label_active" : "info-container__label_profile"}`}>Имя</label>

      <input
        id="name"
        name="name"
        type="text"
        className=
        {`info-container__input 
        ${!islocationProfile ? "info-container__input_active" : ""} 
        ${islocationProfile ? "info-container__input_profile" : ""}
        ${!isCorrectly ? "info-container__input_error" : ""}`
        }
        required
        minLength="2"
        maxLength="30"
        onChange={handleChange}
      />
      <span className={`info-container__error ${!isCorrectly ? "info-container__error_active" : ""}`}>Что-то пошло не так...</span>
    </div>
  );
}

export default FormName;