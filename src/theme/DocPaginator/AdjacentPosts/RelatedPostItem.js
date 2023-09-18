import React from 'react';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import "./RelatedPostItem.css"
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

export default function RelatedPostItem(props) {
  const {permalink, title, subLabel, isNext} = props;
  
  const history = useHistory();

  const handleClick = () => {
    history.push(permalink);
  };

  return (
    <div 
      onClick={handleClick}
      className={clsx(
        'related-adjacent-post-item',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
    >
      {subLabel && 
        <div className="related-post-item-sublabel">{subLabel}</div>
      }
      <div className={clsx("pagination-label-container", {nextContainer: isNext})}>
        {!isNext && <img src={`/img/icons/read-more-arrow.svg`} alt="read-more-arrow" className="page-back-arrow"/>}
        <div className="pagination-nav__label">{title}</div>
        {isNext && <img src={`/img/icons/read-more-arrow.svg`} alt="read-more-arrow" className="page-forward-arrow"/>}
      </div>

    </div>
  );
}