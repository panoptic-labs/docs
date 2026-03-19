import React from 'react';
import Layout from '@theme/Layout';
import useResponsive from '../../hooks/useResponsive';
import FloatingLogos from '../../components/animations/FloatingLogos';
export default function BlogLayout(props) {
  const { isMobileWidth } = useResponsive();
  const {children, latestBlogPost, ...layoutProps} = props;
  return (
    <Layout {...layoutProps} purpleMode={!isMobileWidth}>
      <FloatingLogos />
      {children}
    </Layout>
  );
}
