import React from 'react';
import {BlogPostProvider} from '@docusaurus/theme-common/internal';
import BlogPostItem from '@theme/BlogPostItem';
import './BlogPostItems.css'
export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}) {

  const rowOf2 = items.slice(1, 3)
  const rowsOf3 = items.slice(3)

  return (
    <div className="blog-post-items">
      <div className="blog-post-row-of-2">
        {rowOf2.map(({content: BlogPostContent}) => (
          <BlogPostProvider
            key={BlogPostContent.metadata.permalink}
            content={BlogPostContent}>
            <BlogPostItemComponent>
              <BlogPostContent />
            </BlogPostItemComponent>
          </BlogPostProvider>
        ))}
      </div>
      <div className="blog-post-rows-of-3">
        {rowsOf3.map(({content: BlogPostContent}) => (
          <BlogPostProvider
            key={BlogPostContent.metadata.permalink}
            content={BlogPostContent}>
            <BlogPostItemComponent>
              <BlogPostContent />
            </BlogPostItemComponent>
          </BlogPostProvider>
        ))}
      </div>
    </div>
  );
}
