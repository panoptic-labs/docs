import React from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css';

export default function TOC({className, ...props}) {
  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <div className={styles.tableOfContentsTitle}>Table of Contents</div>
      <TOCItems
        {...props}
        className={styles.tableOfContentsUL}
        linkClassName={styles.tableOfContentsLink}
        itemClassName={styles.tableOfContentItem}
        linkActiveClassName={styles.tableOfContentsLinkActive}
      />
    </div>
  );
}
