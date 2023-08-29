import React from "react";
import './BlogPostImage.css';

const BlogPostImage = ({imageUrl}) => {
  return (
    <img src={imageUrl} className="blog-post-image" ></img>
  )
};

export default BlogPostImage;