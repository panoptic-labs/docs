import React from 'react';
import AdjacentPosts from './AdjacentPosts';

export default function DocPaginator(props) {
  const {previous, next} = props;
  return (
    <AdjacentPosts nextItem={next} prevItem={previous} />
  );
}
