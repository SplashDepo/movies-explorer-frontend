import React from 'react';
import './HamburgerMenu.css';

import ModalWindow from '../ModalWindow/ModalWindow.jsx';
import Navigation from '../Navigation/Navigation.jsx';

function HamburgerMenu({
  setIsModalWindowOpened,
  isModalWindowOpened,
  isHamburgerMenuOpened,
  setIsHamburgerMenuOpened,
}) {
  return (
    <ModalWindow
      setIsModalWindowOpened={setIsModalWindowOpened}
      isModalWindowOpened={isModalWindowOpened}
      setIsHamburgerMenuOpened={setIsHamburgerMenuOpened}
      isHamburgerMenuOpened={isHamburgerMenuOpened}>
      <div className={`hamburger-menu${(isHamburgerMenuOpened && ' hamburger-menu_opened') || ''}`}>
        <Navigation />
      </div>
    </ModalWindow>
  );
}
export default HamburgerMenu;
