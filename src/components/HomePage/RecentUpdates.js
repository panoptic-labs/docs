import React, { useRef } from "react";
import Slider from "react-slick";
import Link from "@docusaurus/Link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./RecentUpdates.css";
import useResponsive from "../../hooks/useResponsive";

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
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const RecentUpdates = () => {
  const { isMobileWidth } = useResponsive();
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
      <div className="recent-updates__container">
        <div className="recent-updates__head">
          <h3 className="recent-updates__title">Recent updates</h3>
          {!isMobileWidth && (
            <div className="recent-updates__pagination">
              <button className="pagination__prev" onClick={handlePrev}>
                <i className="pagination__icon icon__arrow-left" />
              </button>
              <button className="pagination__next" onClick={handleNext}>
                <i className="pagination__icon icon__arrow-right" />
              </button>
            </div>
          )}
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
                  <p className="recent-updates__card__excerpt">
                    {post.exceprt}
                  </p>
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
                  <Link
                    to={post.link}
                    className="recent-updates__card__link with-icon"
                  >
                    Learn more
                    <svg
                      width="5"
                      height="8"
                      viewBox="0 0 5 8"
                      fill="none"
                      className="chevron-right"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.35355 3.51901C4.54882 3.71427 4.54882 4.03085 4.35355 4.22611L1.17157 7.40809C0.976311 7.60335 0.659728 7.60335 0.464466 7.40809C0.269204 7.21283 0.269204 6.89625 0.464466 6.70099L3.29289 3.87256L0.464466 1.04413C0.269204 0.848869 0.269204 0.532287 0.464466 0.337025C0.659728 0.141762 0.976311 0.141762 1.17157 0.337025L4.35355 3.51901ZM3 3.37256H4V4.37256H3V3.37256Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {isMobileWidth && (
          <div className="recent-updates__pagination">
            <button className="pagination__prev" onClick={handlePrev}>
              <i className="pagination__icon icon__arrow-left" />
            </button>
            <button className="pagination__next" onClick={handleNext}>
              <i className="pagination__icon icon__arrow-right" />
            </button>
          </div>
        )}
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
