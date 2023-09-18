import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import clsx from 'clsx';
import "./BlogListPaginator.css"

export default function BlogListPaginator(props) {
  const {metadata} = props;
  const {previousPage, nextPage} = metadata;
  return (
    <nav
      className={clsx("pagination-nav", {"page-one": !previousPage})}
      aria-label={translate({
        id: 'theme.blog.paginator.navAriaLabel',
        message: 'Blog list page navigation',
        description: 'The ARIA label for the blog pagination',
      })}>
      {previousPage && (
        <PaginatorNavLink
          permalink={previousPage}
          title={
            <Translate
              id="theme.blog.paginator.newerEntries"
              description="The label used to navigate to the newer blog posts page (previous page)">
              Newer Entries
            </Translate>
          }
        />
      )}
      {nextPage && (
        <PaginatorNavLink
          permalink={nextPage}
          title={
            <Translate
              id="theme.blog.paginator.olderEntries"
              description="The label used to navigate to the older blog posts page (next page)">
              Older Entries
            </Translate>
          }
          isNext
        />
      )}
    </nav>
  );
}
