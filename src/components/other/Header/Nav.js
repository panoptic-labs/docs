import React from "react";
import clsx from "clsx";
import "./Nav.css"
import { useHistory } from 'react-router-dom';

const Nav = ({purpleMode = false}) => {

  const history = useHistory();

  const handleClick = (permalink) => {
    history.push(permalink);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const iconPath = purpleMode ? 
  "/img/new-home-page/external-link-arrow-white.svg" : 
  "/img/new-home-page/external-link-arrow.svg"

  return (
    <nav className="header__nav">
      <div onClick={() => handleClick("/docs/intro")} className={clsx("nav__link", {"white-text": purpleMode})}>
        Docs
      </div>
      <div onClick={() => handleClick("/blog")} className={clsx("nav__link", {"white-text": purpleMode})}>
        Blog
      </div>
      <div onClick={() => handleClick("/research")} className={clsx("nav__link", {"white-text": purpleMode})}>
        Deep Dive
      </div>
      <div onClick={() => handleClick("/docs/faq/")} className={clsx("nav__link", {"white-text": purpleMode})}>
        FAQ
      </div>
      <div onClick={() => handleClick("https://github.com/panoptic-labs")} className={clsx("nav__link", {"white-text": purpleMode})}>
        Github
        <span className="external-link-arrow">
          <img src={iconPath} alt="arrow"/>
        </span>
      </div>
    </nav>
  );
};

export default Nav;
