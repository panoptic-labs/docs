import Link from "@docusaurus/Link";
import React, { useMemo, useState } from "react";

const GridPosts = ({ faq, stopIndex, showMore }) => {
  const [openedId, setOpenedId] = useState(null);

  const faqToRender = useMemo(() => {
    const list = [];

    for (let i = 0; i < faq.length; i += stopIndex + 1) {
      if (!showMore && i > stopIndex) break;

      list.push(faq.slice(i, i + stopIndex + 1));
    }

    return list;
  }, [showMore, faq]);

  const renderPopup = () => {
    console.log(openedId);
    if (openedId === null) return null;

    const post = faq.find((post) => post.id === openedId);

    return (
      <div className="faq__popup">
        <div className="faq__popup__container">
          <button
            className="faq__popup__close"
            onClick={setOpenedId.bind(null, null)}
          >
            <i className="icon__close" />
          </button>
          <h4 className="faq__popup__title">{post.title}</h4>
          <p className="faq__popup__content">{post.content}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {faqToRender.map((posts, idx) => (
        <div className="faq__posts" key={idx}>
          {posts.map((post) => (
            <div key={post.id} className="faq__post">
              <h3 className="post__title">{post.title}</h3>
              <div>
                {!!post.description ? (
                  <p className="post__description">{post.description}</p>
                ) : null}
                <Link to="/docs/faq/" className="post__link with-icon">
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
          {renderPopup()}
        </div>
      ))}
    </>
  );
};

export default GridPosts;
