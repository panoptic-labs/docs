import React from "react";
import './BlogPostImage.css';
import ReadingTime from "./ReadingTime";

const BlogPostImage = ({imageUrl, readingTime}) => {
  return (
    <div className="blog-post-image-container">
      {imageUrl ? (
        <img src={imageUrl} className="blog-post-image"></img>
      ) : (
        <div className="blog-post-image-placeholder"/>
      )}
      <div className="blog-post-image-read-time">
        <ReadingTime readingTime={readingTime}/>
      </div>
    </div>
  )
};

export default BlogPostImage;