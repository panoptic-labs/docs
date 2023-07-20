import React, { useRef } from "react";
import Slider from "react-slick";
import PillText from "../NewHomePage/PillText/PillText";
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
                        {post.excerpt}
                      </p>
                    </div>
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

const recentUpdates = [
  {
    title: "Join the Panoptic Ambassador Program",
    image: "https://panoptic.xyz/assets/images/panoptic_ambassador_program_banner-a0700278784e3848c596c6b2ab66ad10.png",
    excerpt:
      "With our gated launch drawing near, we are delighted to announce the initiation of the Panoptic Ambassador Program. If you are looking to gain experience working with a cutting-edge, early-stage crypto protocol — and get compensated for it — this is your opportunity.",
    link: "https://panoptic.xyz/blog/panoptic-ambassador-program",
    date: "2023/06/24",
    id: 1,
  },
  {
    title: "Welcome to the Panoptic Community",
    image: "https://panoptic.xyz/assets/images/panoptic_community_launch_banner-9208d531724b2682310e58eac45ee6e0.png",
    excerpt:
      "We are thrilled to announce the launch of our brand new community. This is your invitation to be a part of the future of decentralized options trading.",
    link: "https://panoptic.xyz/blog/panoptic-community-launch",
    date: "2023/06/16",
    id: 2,
  },
  {
    title: "Reality Check: Retail Prefers 2x over 125x Leverage",
    image: "https://panoptic.xyz/assets/images/meme-fc415cdd51a1dcc647d56e8c9d0a1e49.png",
    excerpt:
      "In this post, we'll debunk the myth that crypto retail want max leverage.",
    link: "https://panoptic.xyz/research/retail-prefers-2x-over-125x-leverage",
    date: "2023/06/14",
    id: 3,
  },
  {
    title: "Panoptic Partners with Three Sigma For Enhanced Economic Security",
    image: "https://panoptic.xyz/assets/images/panotic_three_sigma_partnership_banner-e37b4b41efe16d815e980d3aa027406d.png",
    excerpt:
      "To further ensure we provide comprehensive security to our state-of-the-art options protocol, Panoptic is pleased to announce a partnership with Three Sigma, an organization that specializes in agent-based simulations and modeling.",
    link: "https://panoptic.xyz/blog/panoptic-three-sigma-partnership",
    date: "2023/06/09",
    id: 4,
  },
  {
    title: "Why Options Will Overtake DeFi",
    image: "https://panoptic.xyz/assets/images/img-1-dfa75ec7cea7df57180683b4fbf806e5.png",
    excerpt:
      "With the increasing trend of retail options trading in TradFi, it's only a matter of time before this trend sweeps into DeFi. Here's 8 reasons why retail options will overtake DeFi and how Panoptic will be at the center of it all.",
    link: "https://panoptic.xyz/research/why-options-will-overtake-defi",
    date: "2023/06/06",
    id: 5,
  },
  {
    title: "Democratizing DeFi Research Part III: Deep Dive into Backtesting Panoptions",
    image: "https://panoptic.xyz/assets/images/banner-democratizing-research-part-3-backtest-f0c008c3e45f78a311424556216b57c4.jpg",
    excerpt:
      "To conclude our three-part Democratizing DeFi Research series, Brandon guides us through the Panoption backtester.",
    link: "https://panoptic.xyz/blog/democratizing-defi-options-research-backtest",
    date: "2023/06/02",
    id: 6,
  },
  {
    title: "Democratizing DeFi Research Part II: Deep Dive into Implied Volatility",
    image: "https://panoptic.xyz/assets/images/democratizing-defi-research-banner-2-9044f20af3c38a3d5360962fc55c6acf.jpg",
    excerpt:
      "In this second installment of our three-part series on Democratizing DeFi Research, Doctor C gives us a deep dive into the open-source Python script used for studying implied volatility and volatility smiles of Uniswap Liquidity Providers (LPs).",
    link: "https://panoptic.xyz/blog/democratizing-defi-options-research-implied-volatility",
    date: "2023-05-31",
    id: 7,
  },
];

export default RecentUpdates;
