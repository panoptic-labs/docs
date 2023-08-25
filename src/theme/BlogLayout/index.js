import React from 'react';
import Layout from '@theme/Layout';
export default function BlogLayout(props) {
  const {children, latestBlogPost, ...layoutProps} = props;
  return (
    <Layout {...layoutProps}> 
      {children}
    </Layout>
  );
}
