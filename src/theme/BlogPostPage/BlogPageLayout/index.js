import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import './BlogPageLayout.css'
import useResponsive from '../../../hooks/useResponsive';
export default function BlogLayout(props) {

  const { isMobileWidth } = useResponsive();
  const {sidebar, toc, children, ...layoutProps} = props;
  return (
    <Layout {...layoutProps} purpleMode={false}>
      <div className="blog-page-layout">
        {!isMobileWidth &&
          <div className="blog-page-featured-tag-container">
            <span className="blog-page-featured-tag">
              Featured
            </span>
          </div>
        }
        <div className="blog-page-container">
          <main
            className={clsx()}
            itemScope
            itemType="http://schema.org/Blog">
            {children}
          </main>
          {toc && !isMobileWidth && <div className="blog-page-toc">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}