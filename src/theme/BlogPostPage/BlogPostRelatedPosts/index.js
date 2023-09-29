import React from 'react';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import "./BlogPostRelatedPosts.css"
import Translate, {translate} from '@docusaurus/Translate';
import RelatedPostItem from './RelatedPostItem';
import clsx from 'clsx';

export default function BlogPostRelatedPosts() {
  const {metadata} = useBlogPost();
  const {nextItem, prevItem} = metadata;

  return (
    <div className="blog-page-related-posts">
      {(nextItem || prevItem) && (
        <nav
        className={clsx("pagination-nav", {"page-one": !prevItem})}
          aria-label={translate({
            id: 'theme.blog.post.paginator.navAriaLabel',
            message: 'Blog post page navigation',
            description: 'The ARIA label for the blog posts pagination',
          })}>
          {prevItem && (
            <RelatedPostItem
              {...prevItem}
              subLabel={
                <Translate
                  id="theme.blog.post.paginator.newerPost"
                  description="The blog post button label to navigate to the newer/previous post">
                  Newer Post
                </Translate>
              }
            />
          )}
          {nextItem && (
            <RelatedPostItem
              {...nextItem}
              subLabel={
                <Translate
                  id="theme.blog.post.paginator.olderPost"
                  description="The blog post button label to navigate to the older/next post">
                  Older Post
                </Translate>
              }
              isNext
            />
          )}
        </nav>
      )}
    </div>
  )
}