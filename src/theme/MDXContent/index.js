import React from 'react';
import {MDXProvider} from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';
import './MDXContent.css'
export default function MDXContent({children}) {
  return (
  <div className="blog-p"><MDXProvider components={MDXComponents}>{children}</MDXProvider></div>);
}
