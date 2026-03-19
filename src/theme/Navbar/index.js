// navbar/index.js
import React from 'react';
import Header from '../../components/other/Header';
import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';
import {useWindowSize} from '@docusaurus/theme-common';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';
import { APP_LINK } from '../../constants';

export default function Navbar({purpleMode = true}) {
  const windowSize = useWindowSize();
  const location = useLocation();

  const isDocsPage = location.pathname.startsWith('/docs');

  return (
    <Header purpleMode={purpleMode}>
      {windowSize === 'mobile' && isDocsPage && (
        <button
          aria-label="Toggle docs navigation"
          className={styles.docsBtn}
          onClick={() => window.dispatchEvent(new Event('open-docs-drawer'))}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="4" cy="6" r="1.5" />
          <line x1="8" y1="6" x2="20" y2="6" />
          <circle cx="4" cy="12" r="1.5" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <circle cx="4" cy="18" r="1.5" />
          <line x1="8" y1="18" x2="20" y2="18" />
        </svg>
        </button>
      )}
      {isDocsPage ? (
        <NavbarSearch>
          <SearchBar />
        </NavbarSearch>
      ) : (
        windowSize !== 'mobile' && (
          <a href={APP_LINK} className={styles.navLaunchBtn} target="_blank" rel="noopener noreferrer">
            Launch App →
          </a>
        )
      )}
    </Header>
  );
}
