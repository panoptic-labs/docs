import React from "react";

import "./Hero.css";
import Button from "../other/Button";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="content__title">Panoptic</h1>
        <span className="content__subtitle">
          the perpetual options protocol
        </span>
        <span className="content__description">
          Permissionlessly trade options on any crypto asset
        </span>
        <div className="content__buttons">
          <Button>Launch App</Button>
          <Button variant="outlined">Learn mode</Button>
        </div>
      </div>
      <div className="hero__planet">
        <img src="/img/planet.png" alt="planet" />
      </div>
    </section>
  );
};

export default Hero;
