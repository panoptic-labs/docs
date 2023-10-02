import React from "react";
import './BlogPostImage.css';
import ReadingTime from "./ReadingTime";
import {useBlogPost} from '@docusaurus/theme-common/internal';

const BlogPostImage = ({imageUrl, readingTime}) => {
  const {metadata} = useBlogPost();

  let currentPath = '';

  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname;
  }
  const firstPartOfPath = currentPath.split('/')[1];
  const researchActive = firstPartOfPath === 'research'

  const defaultImageUrl = researchActive ? 
    "/img/research-placeholder.png" : 
    "/img/blog-placeholder.png";

  const image = imageUrl ?? defaultImageUrl

  return (
    <div 
      className="blog-post-image-container" 
      onClick={() => window.location.href = metadata.permalink}
    >      
      <img src={image} className="blog-post-image"></img>
      <div className="blog-post-image-read-time">
        <ReadingTime readingTime={readingTime}/>
      </div>
    </div>
  )
};

export default BlogPostImage;