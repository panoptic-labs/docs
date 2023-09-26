import React from "react";
import { BlogPostProvider } from '@docusaurus/theme-common/internal';
import BlogPostDetails from "../BlogPostItem/Details";
import BlogPostImage from "../BlogPostItem/BlogPostImage";
import './BlogLandingPage.css'

const BlogLandingPage = ({latestBlogPost}) => {

  const BlogPostContent =  latestBlogPost.content
  const metadata = latestBlogPost.content?.metadata
  const imageUrl = metadata.frontMatter?.image;
  const readingTime = metadata.readingTime

  let currentPath = '';

  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname;
  }
  const firstPartOfPath = currentPath.split('/')[1];
  const researchActive = firstPartOfPath === 'research'

  return (
    <div className="blog-landing-page">
      <div className="blog-title">
        {researchActive ? `Panoptic Deep Dive` : `Panoptic Blog`}
      </div>
      <div className="blog-subtitle">
        {researchActive ? 
          `Explore the latest research on perpetual options and all things DeFi.` : 
          `Discover the latest product features, cutting-edge technology, solutions, and news on our blog!`
        }
      </div>
      <BlogPostProvider
        key={metadata.permalink}
        content={BlogPostContent}>

        <div className="landing-page-blog-post">
          <div className="landing-image-container">
            <BlogPostImage 
              imageUrl={imageUrl} 
              readingTime={readingTime}
            />
          </div>
          <div className="landing-page-blog-details">
            <div className="featured-tag-container">
              <span className="featured-tag">Featured</span>
            </div>
            <BlogPostDetails whiteText={true}/>
          </div>
        </div>

      </BlogPostProvider>
    </div>
  );
};

export default BlogLandingPage;