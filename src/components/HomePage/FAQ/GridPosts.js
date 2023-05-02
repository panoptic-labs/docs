import React, { useMemo } from "react";
import Link from "@docusaurus/Link";

const GridPosts = ({ faq, stopIndex, showMore }) => {
  const faqToRender = useMemo(() => {
    const list = [];

    for (let i = 0; i < faq.length; i += stopIndex + 1) {
      if (!showMore && i > stopIndex) break;

      list.push(faq.slice(i, i + stopIndex + 1));
    }

    return list;
  }, [showMore, faq]);

  return (
    <>
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
    </>
  );
};

export default GridPosts;
