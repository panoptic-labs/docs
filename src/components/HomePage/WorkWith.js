import React, { useCallback, useEffect, useRef, useState } from "react";

import "./WorkWith.css";
import clsx from "clsx";
import useResponsive from "../../hooks/useResponsive";

const WorkWith = () => {
  const { isTabletWidth, isMobileWidth } = useResponsive();
  const countOfCards = isMobileWidth ? 8 : isTabletWidth ? 6 : 12;
  const [paginator, setPaginator] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPaginator(
        Math.ceil(coins.length / countOfCards) === paginator ? 1 : paginator + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [countOfCards, paginator, setPaginator]);

  const renderCard = useCallback(
    (name, index) => {
      if (
        index > paginator * countOfCards ||
        index <= paginator * countOfCards - countOfCards
      ) {
        return null;
      }

      return (
        <div className="coins__card" key={`${name}_${index}`}>
          <div className="card__image">
            <img
              src={`/img/coins/${name}.png`}
              width="40"
              height="40"
              alt={name}
            />
          </div>
          <span className="card__name">{name.toUpperCase()}</span>
        </div>
      );
    },
    [paginator, countOfCards]
  );

  return (
    <section className="work-with">
      <div className="work-with__container">
        <h2 className="work-with__title">
          Panoptic work with{" "}
          <span className="title__main">any ERC20 token</span>
        </h2>
        <div className="work-with__coins">
          <div className="coins__cards">{coins.map(renderCard)}</div>
          <div className="coins__pagination">
            {[...Array(Math.ceil(coins.length / countOfCards)).keys()].map(
              (key) => (
                <button
                  aria-label={key + 1}
                  className={clsx("pagination_button", {
                    pagination_active: key === paginator - 1,
                  })}
                  onClick={setPaginator.bind(null, key + 1)}
                />
              )
            )}
          </div>
        </div>
        <div className="work-with__features">
          <div className="features__card">
            <h3>EASY TO USE</h3>
            <p>Panoptic designed from the ground up to be easy to use..</p>
            <i className="features__card_bg" />
          </div>
          <div className="features__card">
            <h3>LIQUID MARKETS</h3>
            <p>Panoptic designed from the ground up to be easy to use..</p>
            <i className="features__card_bg" />
          </div>
          <div className="features__card">
            <h3>PERPETUAL OPTION</h3>
            <p>Panoptic designed from the ground up to be easy to use..</p>
            <i className="features__card_bg" />
          </div>
        </div>
      </div>
    </section>
  );
};

const coins = [
  "wbtc",
  "eth",
  "usdc",
  "dai",
  "usdt",
  "bnb",
  "uni",
  "aave",
  "comp",
  "sushi",
  "shib",
  "matic",
  "wbtc",
  "eth",
  "usdc",
  "uni",
  "aave",
  "matic",
  "comp",
  "sushi",
  "shib",
  "dai",
  "uni",
  "aave",
  "comp",
  "sushi",
  "shib",
  "matic",
  "usdt",
  "bnb",
  "wbtc",
  "eth",
  "usdc",
  "dai",
  "usdt",
  "bnb",
];

export default WorkWith;
