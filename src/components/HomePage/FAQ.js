import React, { useMemo, useState } from "react";

import "./FAQ.css";
import Link from "@docusaurus/Link";
import Button from "../other/Button";

const FAQ = () => {
  const [showMore, setShowMore] = useState(false);

  const faqToRender = useMemo(() => {
    const list = [];

    for (let i = 0; i < faq.length; i += 6) {
      if (!showMore && i > 5) break;

      list.push(faq.slice(i, i + 6));
    }

    return list;
  }, [showMore, faq]);

  return (
    <section className="faq">
      <h2 className="faq__title">F.A.Q.</h2>
      {faqToRender.map((posts, idx) => (
        <div className="faq__posts" key={idx}>
          {posts.map((post) => (
            <div key={post.title} className="faq__post">
              <h3 className="post__title">{post.title}</h3>
              <div>
                {!!post.description ? (
                  <p className="post__description">{post.description}</p>
                ) : null}
                <Link className="post__link" to={post.link}>
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      ))}
      {!showMore && (
        <Button
          className="faq__load-more"
          variant="outlined"
          onClick={setShowMore.bind(null, true)}
        >
          More
        </Button>
      )}
    </section>
  );
};

const faq = [
  {
    title: "What is liquity?",
    description:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return. This differs from the liquidity provider (LP) who deploys liquidity in a Uniswap V3 pool and receives swap fees in return. The option seller borrows liquidity from the PLP to deploy in a Uniswap V3 pool as an LP.",
    link: "/",
  },
  {
    title: "How can I use liquity?",
    description:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return. This differs from the liquidity provider (LP) who deploys liquidity in a Uniswap V3 pool and receives swap fees in return.",
    link: "/",
  },
  {
    title: "What are the key benefits of liquity?",
    link: "/",
  },
  {
    title: "How can I earn money on liquity?",
    link: "/",
  },
  {
    title: "How can I use liquity?",
    description:
      "The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return. This differs from the liquidity provider (LP) who deploys liquidity in a Uniswap V3 pool and receives swap fees in return. ",
    link: "/",
  },
  {
    title: "How can I earn money on liquity?",
    link: "/",
  },
];

export default FAQ;
