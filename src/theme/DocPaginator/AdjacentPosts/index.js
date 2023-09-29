import React from 'react';
import "./BlogPostRelatedPosts.css"
import Translate, {translate} from '@docusaurus/Translate';
import RelatedPostItem from './RelatedPostItem';
import clsx from 'clsx';

export default function AdjacentPosts({nextItem, prevItem}) {

  return (
    <div className="adjacent-posts">
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
                  Previous
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
                  Next
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