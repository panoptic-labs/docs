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
    title: "Panoptic Named Honorable Mention in Fast Company’s 2023 World Changing Ideas Awards",
    image: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*CQaWP1zIXUUcOprGQItehQ.png",
    excerpt:
      "Fast Company revealed the winners of their highly-anticipated 2023 World Changing Ideas Awards today. Among the remarkable entries was Panoptic, our groundbreaking, permissionless options protocol which earned an honorable mention in the crypto and blockchain category.",
    link: "https://blog.panoptic.xyz/panoptic-named-honorable-mention-in-fast-companys-2023-world-b30092095b9a",
    date: "2023-05-02",
    id: 1,
  },
  {
    title: "Panoptic at Cornell Blockchain Conference 2023",
    image: "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*92UAhLAzuyok2ack.jpeg",
    excerpt:
      "In this post, we summarize our attendance of the 2023 Cornell Blockchain Conference which had record participation — the venue completely sold out of its 600 tickets!",
    link: "https://blog.panoptic.xyz/panoptic-at-cornell-blockchain-conference-2023-49f47c04aa44",
    date: "2023-04-29",
    id: 2,
  },
  {
    title: "Mastering Panoptic: The Definitive Resource Guide for All Things Panoptic",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*zWYRNzaaogbe0t1xUj_dsg.png",
    excerpt:
      "We are thrilled to announce the official launch of Panoptic Docs, the ultimate resource for understanding our innovative “magical” technology.",
    link: "https://blog.panoptic.xyz/mastering-panoptic-the-definitive-resource-guide-cf6dd50c15c5",
    date: "2023-04-04",
    id: 3,
  },
  {
    title: "Panoptic Research launches on Substack",
    image: "/img/recent-updates/post-1.png",
    excerpt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "https://blog.panoptic.xyz/panoptic-research-launches-on-substack-abe7473693d6",
    date: "2023-03-20",
    id: 4,
  },
  {
    title: "Panoptic Partners with OpenZeppelin for their Second Smart Contract Audit",
    image: "/img/recent-updates/post-2.png",
    excerpt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "https://blog.panoptic.xyz/panoptic-partners-with-openzeppelin-for-their-second-smart-contract-audit-379e9bd25540",
    date: "2023-03-08",
    id: 5,
  },
  {
    title: "ETH Denver 2023—A Recap",
    image: "/img/recent-updates/post-3.png",
    excerpt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "https://blog.panoptic.xyz/eth-denver-2023-a-recap-8b498abd9196",
    date: "2023-03-08",
    id: 6,
  },
  {
    title: "Panoptic's V1 Roadmap",
    image: "/img/recent-updates/post-3.png",
    excerpt:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return.",
    link: "https://blog.panoptic.xyz/panoptics-v1-roadmap-d7b72a8e2005",
    date: "2023-03-05",
    id: 7,
  },
];

export default RecentUpdates;
