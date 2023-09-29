import React from 'react';
import clsx from 'clsx';
import Button from '../../components/UIKit/Button';
import { useHistory } from 'react-router-dom';
import "./PaginatorNavLink.css"

export default function PaginatorNavLink(props) {
  const {permalink, title, subLabel, isNext} = props;
  const history = useHistory();

  const handleClick = () => {
    history.push(permalink);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <Button 
      onClick={handleClick}
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
    >
      {subLabel && 
        <div className="pagination-nav__sublabel">{subLabel}</div>
      }
      <div className="pagination-label-container">
        {!isNext && <img src={`/img/icons/read-more-arrow.svg`} alt="read-more-arrow" className="page-back-arrow"/>}
        <div className="pagination-nav__label">{title}</div>
        {isNext && <img src={`/img/icons/read-more-arrow.svg`} alt="read-more-arrow" className="page-forward-arrow"/>}
      </div>

    </Button>
  );
}
