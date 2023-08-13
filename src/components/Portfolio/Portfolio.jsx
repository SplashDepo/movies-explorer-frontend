import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio block-section">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__table">
        <li className="portfolio__item">
          <a
            className="portfolio__link link-click"
            href="https://splashdepo.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer noopener"
          >Статичный сайт
            <img className="portfolio__icon" alt="иконка перехода на проект" src={arrow}></img>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link-click "
            href="https://splashdepo.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer noopener"
          >Адаптивный сайт
            <img className="portfolio__icon" alt="иконка перехода на проект" src={arrow}></img>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link-click "
            href="https://github.com/SplashDepo/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer noopener"
          > Одностраничное приложение
            <img className="portfolio__icon" alt="иконка перехода на проект" src={arrow}></img>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;