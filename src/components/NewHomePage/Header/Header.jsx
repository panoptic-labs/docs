import React from 'react';
import {useWindowSize} from '@docusaurus/theme-common';
import "./Header.css"

const Header = ({children, purpleMode = true}) => {
  const windowSize = useWindowSize();

  return (
    <div className={`header ${windowSize === 'mobile' ? 'header--mobile' : ''}`}>
      {children}
    </div>
  )
}

export default Header