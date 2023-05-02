import React from "react";
import { Accordion, AccordionItem } from "react-sanfona";

const AccordionPosts = ({ faq, stopIndex, showMore }) => {
  return (
    <Accordion>
      {faq.map((post, index) => {
        if (!showMore && index >= stopIndex) return null;

        return (
          <AccordionItem
            key={post.title}
            titleClassName="post__title"
            className="faq__post"
            title={post.title}
          >
            <p className="post__description">{post.description}</p>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default AccordionPosts;
