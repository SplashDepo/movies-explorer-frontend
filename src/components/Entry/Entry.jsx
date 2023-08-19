import React from "react";
import { useMatch } from "react-router-dom";
import "./Entry.css"

import Logo from "../Logo/Logo.jsx";

function Entry({
  children,
  heading,
  name,
  btn,
  btnAriaLabel,
  onSubmit,
  onLoad,
  isValid,
  error,
}) {
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isLoginHref = href.pathname.endsWith("/signin");

  const inputs = children.slice(0, -1);
  const link = children.slice(-1);

  return (
    <div className="entry">
      <div className="entry__wrapper">
        <Logo />
        <h1 className="entry__heading">{heading}</h1>
        <form
          className="entry__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <fieldset
            className={`entry__fieldset${(isLoginHref && " entry__fieldset_margin_big") || ""
              }`}
          >
            {inputs}
          </fieldset>
          <div className="entry__wrapper-btn">
            <span
              className={`error${((error?.registrationResponse ||
                error?.authorizationResponse) &&
                "error_visible") ||
                ""
                } error_type_server-response`}
            >
              {error?.registrationResponse || error?.authorizationResponse}
            </span>
            <button
              className="entry__btn"
              type="submit"
              aria-label={btnAriaLabel}
              disabled={!isValid || onLoad}
            >
              {onLoad ? "Подождите..." : btn}
            </button>
          </div>
        </form>
        {link}
      </div>
    </div>
  );
}

export default Entry;