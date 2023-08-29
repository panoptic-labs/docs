import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useThemeConfig} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
export default function Heading({as: As, id, ...props}) {
  const {
    navbar: {hideOnScroll},
  } = useThemeConfig();
  // H1 headings do not need an id because they don't appear in the TOC.
  if (As === 'h1' || !id) {
    return (
      <div className={clsx(styles.headingStyle)}>
        <As {...props} id={undefined} />
      </div>
    );
  }
  const anchorTitle = translate(
    {
      id: 'theme.common.headingLinkTitle',
      message: 'Direct link to {heading}',
      description: 'Title for link to heading',
    },
    {
      heading: typeof props.children === 'string' ? props.children : id,
    },
  );
  return (
    <As
      {...props}
      className={clsx(
        'anchor',
        hideOnScroll
          ? styles.anchorWithHideOnScrollNavbar
          : styles.anchorWithStickyNavbar,
        props.className,
      )}
      id={id}>
      <div className={clsx(styles.headingStyle)}>
        {props.children}
      </div>
      <Link
        className="hash-link"
        to={`#${id}`}
        aria-label={anchorTitle}
        title={anchorTitle}>
        &#8203;
      </Link>
    </As>
  );
}
