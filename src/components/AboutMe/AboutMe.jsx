import React from 'react';
import './AboutMe.css';
import Foto from '../../images/about_me_pic.jpg'

function AboutMe() {
  return (
    <section className="about-me block-section">
      <h2 className="about-me__title block-section__title">Студент</h2>
      <div className="about-me__block">
        <div className="about-me__block-info">
          <h3 className="about-me__suttitle">Влад</h3>
          <p className="about-me__text">Фронтенд разработчик, 23 год</p>
          <article className="about-me__info">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia rem, voluptates tempore unde hic nulla dolorum, ipsam, debitis consequatur dolor repudiandae? Amet aperiam ad, ea saepe earum error maiores ut.
          </article>
          <nav className="about-me__contacts">
            <a
              href="https://github.com/SplashDepo"
              target="_blank"
              className="about-me__link link-click"
              rel="noreferrer noopener">
              <p className="about-me__link-text">GitHub</p>
            </a>
          </nav>
        </div>
        <img
          className="about-me__image"
          src={Foto}
          alt="фото студента"
        />
      </div>

    </section>
  );
}

export default AboutMe;