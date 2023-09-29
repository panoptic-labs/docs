import React from "react";
import './BlogPostImage.css';
import ReadingTime from "./ReadingTime";
import {useBlogPost} from '@docusaurus/theme-common/internal';

const BlogPostImage = ({imageUrl = "/img/research-placeholder.png", readingTime}) => {
  const {metadata} = useBlogPost();

  return (
    <div 
      className="blog-post-image-container" 
      onClick={() => window.location.href = metadata.permalink}
    >      
      <img src={imageUrl} className="blog-post-image"></img>
      <div className="blog-post-image-read-time">
        <ReadingTime readingTime={readingTime}/>
      </div>
    </div>
  )
};

export default BlogPostImage;