import React from "react";
import "./Input.css"

function Input({
  label,
  htmlFor,
  id,
  name,
  type,
  minLength,
  maxLength,
  autoComplete,
  onChange,
  pattern,
  errorCondition,
  errorMessage,
}) {
  return (
    <>
      <div className="input__wrapper">
        <label className="input__label" htmlFor={htmlFor}>
          {label}
        </label>
        <input
          className="input__field"
          id={id}
          name={name}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete={autoComplete}
          required
          onChange={onChange}
          pattern={pattern}
        />
        <span className={`input__error${(errorCondition && " input__error_visible") || ""}`}>
          {errorMessage}
        </span>
      </div>
    </>
  );
}

export default Input;