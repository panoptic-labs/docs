import React, { useRef } from "react";
import Slider from "react-slick";
import PillText from "../NewHomePage/PillText/PillText";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import recentUpdates from '../../../recentUpdates.json';

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
      breakpoint: 1175,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 820,
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
    <section className="recent-updates" id={'updates'}>
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
                <a href={post.link}>
                  <div className="recent-updates__card__content">
                    <div className="recent-updates__card_top">
                      <img
                        className="recent-updates__card__image"
                        src={post.image}
                        alt={post.title}
                      />
                      <div className="recent-updates__card__title">{post.title}</div>
                      <p className="recent-updates__card__excerpt">
                        {post.description}
                      </p>
                    </div>
                    <div className="recent-updates__card_bottom">
                      <PillText grey={true}>
                        <span className="recent-updates__card__date">
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            year: "numeric",
                            day: "numeric",
                          })
                            .format(new Date(post.date))
                            }
                        </span>
                      </PillText>
                    </div>
                  </div>
                </a>
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

export default RecentUpdates;
