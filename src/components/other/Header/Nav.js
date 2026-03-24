import React from "react";
import clsx from "clsx";
import "./Nav.css"
import { useHistory } from 'react-router-dom';
import { APP_LINK } from "../../../constants";

const Nav = ({purpleMode = false}) => {

  const history = useHistory();

  const handleClick = (permalink) => {
    if (permalink.startsWith('http')) {
      window.location.href = permalink;
    } else {
      history.push(permalink);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

  return (
    <nav className="header__nav">
      <button onClick={() => handleClick("/docs/intro")} className="nav__link">
        Docs
      </button>
      <button onClick={() => handleClick("/research")} className="nav__link">
        Research
      </button>
      <button onClick={() => handleClick("/blog")} className="nav__link">
        Blog
      </button>
      <button onClick={() => handleClick("https://github.com/panoptic-labs")} className="nav__link">
        GitHub
      </button>
    </nav>
  );
};

export default Nav;
