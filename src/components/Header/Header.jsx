import React, { useState } from "react";
import "./Header.css"
import { Outlet, Link, useLocation } from "react-router-dom";


import useWindowDimensions from "../../hooks/useWindowDimensions.js";

import Logo from "../Logo/Logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";

import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";

import {
  ENDPOINT_SIGNUP,
  ENDPOINT_SIGNIN,
  TABLET_SCREEN_WIDTH,
} from "../../utils/constants.js";

function Header({ isCurrentUserLoggedIn }) {
  const location = useLocation();
  const islocationBasic = location.pathname === "/";
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [isHamburgerMenuOpened, setIsHamburgerMenuOpened] = useState(false);

  function openModalWindow() {
    setIsModalWindowOpened(true);
  }

  function toggleHamburgerMenu() {
    if (!isModalWindowOpened) {
      openModalWindow();
    }

    setIsHamburgerMenuOpened(!isHamburgerMenuOpened);
  }

  const isMobileWidth = useWindowDimensions() <= TABLET_SCREEN_WIDTH;

  function renderHeaderMenu() {
    if (isMobileWidth && isCurrentUserLoggedIn) {
      return (
        <button
          className={`hamburger${(isHamburgerMenuOpened && " hamburger_clicked") || ""
            }`}
          type="button"
          aria-label="Гамбургер-меню с навигацией по приложению"
          onClick={() => toggleHamburgerMenu()}
        >
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </button>
      );
    }

    if (!isCurrentUserLoggedIn) {
      return (
        <div className="header__auth">
          <Link className="header__link" to={ENDPOINT_SIGNUP}>
            Регистрация
          </Link>
          <Link
            className="header__link header__link_color_accent btn-auth"
            to={ENDPOINT_SIGNIN}
          >
            Войти
          </Link>
        </div>
      );
    }

    return <Navigation />;
  }

  return (
    <>
      <header className={`${islocationBasic ? "header" : "header_type_private"}`}>
        <div className="wrapper header__wrapper">
          <Logo />
          {renderHeaderMenu()}
        </div>
      </header>
      <Outlet />
      {isMobileWidth && (
        <HamburgerMenu
          isModalWindowOpened={isModalWindowOpened}
          setIsModalWindowOpened={setIsModalWindowOpened}
          isHamburgerMenuOpened={isHamburgerMenuOpened}
          setIsHamburgerMenuOpened={setIsHamburgerMenuOpened}
        />
      )}
    </>
  );
}

export default Header;