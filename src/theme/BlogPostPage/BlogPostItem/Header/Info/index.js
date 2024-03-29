import React from 'react';
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
  const {date, formattedDate, readingTime} = metadata;
  return (
    <div className={clsx(styles.container, className)}>
      <Date date={date} formattedDate={formattedDate} />
    </div>
  );
}
