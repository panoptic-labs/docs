import React, { useRef } from "react";
import Slider from "react-slick";
import Link from "@docusaurus/Link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./RecentUpdates.css";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  width: "100%",
  nextArrow: <></>,
  prevArrow: <></>,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
};

const RecentUpdates = () => {
  const slickRef = useRef(null);

  const handleNext = () => {
    if (slickRef.current) {
      slickRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (slickRef.current) {
      slickRef.current.slickPrev();
    }
  };

  return (
    <section className="recent-updates">
      <div className="recent-updates__head">
        <h3 className="recent-updates__title">Recent updates</h3>
        <div className="recent-updates__pagination">
          <button className="pagination__prev" onClick={handlePrev}>
            <i className="pagination__icon icon__arrow-left" />
          </button>
          <button className="pagination__next" onClick={handleNext}>
            <i className="pagination__icon icon__arrow-right" />
          </button>
        </div>
      </div>
      <div className="recent-updates__cards">
        <Slider {...settings} ref={slickRef}>
          {recentUpdates.map((post) => (
            <div className="recent-updates__card" key={post.id}>
              <div className="recent-updates__card_top">
                <img
                  className="recent-updates__card__image"
                  src={post.image}
                  alt={post.title}
                />
                <h4 className="recent-updates__card__title">{post.title}</h4>
                <p className="recent-updates__card__excerpt">{post.exceprt}</p>
              </div>
              <div className="recent-updates__card_bottom">
                <span className="recent-updates__card__date">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                    .format(new Date(post.date))
                    .replace(/ /, ", ")}
                </span>
                <Link to={post.link} className="recent-updates__card__link">
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

const recentUpdates = [
  {
    id: 1,
    title: "Liquity Q1 2023 report",
    image: "/img/recent-updates/post-1.png",
    exceprt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "/",
    date: "2019-10-12 21:52:10",
  },
  {
    id: 2,
    title: "Liquity Q1 2023 report",
    image: "/img/recent-updates/post-2.png",
    exceprt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "/",
    date: "2019-10-12 21:52:10",
  },
  {
    id: 3,
    title: "Liquity Q1 2023 report",
    image: "/img/recent-updates/post-3.png",
    exceprt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "/",
    date: "2019-10-12 21:52:10",
  },
  {
    id: 4,
    title: "Liquity Q1 2023 report",
    image: "/img/recent-updates/post-1.png",
    exceprt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "/",
    date: "2019-10-12 21:52:10",
  },
  {
    id: 5,
    title: "Liquity Q1 2023 report",
    image: "/img/recent-updates/post-2.png",
    exceprt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "/",
    date: "2019-10-12 21:52:10",
  },
  {
    id: 6,
    title: "Liquity Q1 2023 report",
    image: "/img/recent-updates/post-3.png",
    exceprt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "/",
    date: "2019-10-12 21:52:10",
  },
];

export default RecentUpdates;
