import React from 'react';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import "./BlogPostRelatedPosts.css"

export default function BlogPostRelatedPosts() {
  const {metadata} = useBlogPost();
  console.log(344, metadata)
  const {nextItem, prevItem} = metadata;

  return (
    <div className="blog-page-related-posts">
      <h2 className="related-posts-title">Related Articles</h2>
      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}
    </div>
  )
}