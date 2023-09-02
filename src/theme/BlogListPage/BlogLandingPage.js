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
  return (
    <div className="blog-landing-page">
      <div className="blog-title">
        Panoptic Blog
      </div>
      <div className="blog-subtitle">
        Discover the latest product features, cutting-edge technology, solutions, and news on our blog!
      </div>
      <BlogPostProvider
        key={metadata.permalink}
        content={BlogPostContent}>

        <div className="landing-page-blog-post">
          <BlogPostImage imageUrl={imageUrl} readingTime={readingTime}/>
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