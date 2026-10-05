import React from 'react';
import EditorialUpdate from '@site/src/components/EditorialUpdate';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';

function Date({date, formattedDate}) {
  return (
    <time dateTime={date} itemProp="datePublished">
      {formattedDate}
    </time>
  );
}

export default function BlogPostItemHeaderInfo({className}) {
  const {metadata} = useBlogPost();
  const {date, formattedDate, frontMatter} = metadata;
  return (
    <div className={clsx(styles.container, className)}>
      Published <Date date={date} formattedDate={formattedDate} />
      {frontMatter.editorial_update && (
        <>
          {' · '}
          <EditorialUpdate date={frontMatter.editorial_update} itemProp="dateModified" />
        </>
      )}
    </div>
  );
}
