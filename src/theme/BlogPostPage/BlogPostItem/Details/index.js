import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import EditThisPage from '@theme/EditThisPage';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';
import './BlogPostDetails.css'
export default function BlogPostDetails({whiteText = false}) {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {tags, title, editUrl, hasTruncateMarker, description, formattedDate} = metadata;
  // A post is truncated if it's in the "list view" and it has a truncate marker
  const truncatedPost = !isBlogPostPage && hasTruncateMarker;
  const tagsExists = tags.length > 0;
  const renderFooter = tagsExists || truncatedPost || editUrl;
  if (!renderFooter) {
    return null;
  }
  return (
    <div>
      <div className={clsx("blog-details-date", {"text-white": whiteText})}>
        {formattedDate}
      </div>
      <div className={clsx("blog-details-title", {"text-white": whiteText})}>
        {title}.
      </div>
      <div className={clsx("blog-details-description", {"text-white": whiteText})}>
        {description}.
      </div>
      {tagsExists && (
        <div className="blog-details-tag-list">
          <TagsListInline tags={tags} />
        </div>
      )}

      {isBlogPostPage && editUrl && (
        <div className="col margin-top--sm">
          <EditThisPage editUrl={editUrl} />
        </div>
      )}

      {truncatedPost && (
        <div className="blog-details-read-more">
          <ReadMoreLink blogPostTitle={title} to={metadata.permalink} whiteText={whiteText}/>
        </div>
      )}
    </div>
  );
}
