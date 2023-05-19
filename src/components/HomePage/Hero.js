import Link from "@docusaurus/Link";
import React from "react";
import { useColorMode } from "@docusaurus/theme-common";

import "./Hero.css";
import Button from "../other/Button";

const Hero = () => {
  const { colorMode } = useColorMode();
  const appIsDisabled = true; // Set the app disabled state

  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="content__title">Panoptic</h1>
        <span className="content__subtitle">
          The perpetual, oracle-free options protocol
        </span>
        <span className="content__description">
          Permissionlessly trade options on any crypto asset
        </span>
        <div className="content__buttons">
          <Button hasIcon disabled={appIsDisabled}>
            {appIsDisabled ? "App Coming Soon" : "Launch App"}
          </Button>
          <Link to="/docs/intro">
             <Button variant="outlined" hasIcon>Learn more</Button>
          </Link>
        </div>
      </div>
      <div className="hero__planet">
        <img src={`/img/planet-${colorMode}.png`} alt="planet" />
      </div>
    </section>
  );
};

export default Hero;
