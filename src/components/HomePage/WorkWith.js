import React, { useCallback, useEffect, useRef, useState } from "react";

import "./WorkWith.css";
import clsx from "clsx";

const WorkWith = () => {
  const countOfCards = useRef(12);
  const [paginator, setPaginator] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPaginator(
        Math.ceil(partners.length / countOfCards.current) === paginator
          ? 1
          : paginator + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [countOfCards.current, paginator, setPaginator]);

  const renderCard = useCallback(
    (name, index) => {
      if (
        index > paginator * countOfCards.current ||
        index <= paginator * countOfCards.current - countOfCards.current
      ) {
        return null;
      }

      return (
        <div className="partners__card" key={`${name}_${index}`}>
          <div className="card__image">
            <img
              src={`/img/partners/${name}.png`}
              width="40"
              height="40"
              alt={name}
            />
          </div>
          <span className="card__name">{name.toUpperCase()}</span>
        </div>
      );
    },
    [paginator, countOfCards.current]
  );

  return (
    <section className="work-with">
      <h2 className="work-with__title">
        Panoptic work with <span className="title__main">any ERC20 token</span>
      </h2>
      <div className="work-with__partners">
        <div className="partners__cards">{partners.map(renderCard)}</div>
        <div className="partners__pagination">
          {[
            ...Array(Math.ceil(partners.length / countOfCards.current)).keys(),
          ].map((key) => (
            <button
              aria-label={key + 1}
              className={clsx("pagination_button", {
                pagination_active: key === paginator - 1,
              })}
              onClick={setPaginator.bind(null, key + 1)}
            />
          ))}
        </div>
      </div>
      <div className="work-with__features">
        <div className="features__card">
          <h3>EASY TO USE</h3>
          <p>Panoptic designed from the ground up to be easy to use..</p>
        </div>
        <div className="features__card">
          <h3>LIQUID MARKETS</h3>
          <p>Panoptic designed from the ground up to be easy to use..</p>
        </div>
        <div className="features__card">
          <h3>PERPETUAL OPTION</h3>
          <p>Panoptic designed from the ground up to be easy to use..</p>
        </div>
      </div>
    </section>
  );
};

const partners = [
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
