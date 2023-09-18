import React from "react";
import './BlogPostImage.css';
import ReadingTime from "./ReadingTime";

const BlogPostImage = ({imageUrl = "/img/research-placeholder.png", readingTime}) => {
  return (
    <div className="blog-post-image-container">
      <img src={imageUrl} className="blog-post-image"></img>
      <div className="blog-post-image-read-time">
        <ReadingTime readingTime={readingTime}/>
      </div>
    </div>
  )
};

export default BlogPostImage;