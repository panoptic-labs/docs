// src/theme/DocPage/Layout/index.js
import React, {useState, useEffect} from 'react';
import {useDocsSidebar} from '@docusaurus/theme-common/internal';
import {useWindowSize} from '@docusaurus/theme-common';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import BackToTopButton from '@theme/BackToTopButton';
import DocPageLayoutSidebar from '@theme/DocPage/Layout/Sidebar';
import DocPageLayoutMain from '@theme/DocPage/Layout/Main';
import DocSidebarItems from '@theme/DocSidebarItems';
import styles from './styles.module.css';

export default function DocPageLayout({children}) {
  const sidebar = useDocsSidebar();
  const windowSize = useWindowSize();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);

  useEffect(() => {
    const h = () => setDrawerOpen(true);
    window.addEventListener('open-docs-drawer', h);
    return () => window.removeEventListener('open-docs-drawer', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
  }, [drawerOpen]);

  return (
    <Layout wrapperClassName={styles.docsWrapper}>
      <BackToTopButton />

      {/* Mobile Drawer */}
      {windowSize === 'mobile' && sidebar && drawerOpen && (
        <>
          <div
            className={styles.drawerBackdrop}
            onClick={() => setDrawerOpen(false)}
          />
          <div className={styles.drawer}>
            <button
              className={styles.closeBtn}
              onClick={() => setDrawerOpen(false)}
            >
              ‹
            </button>
            <DocSidebarItems
              items={sidebar.items}
              activePath={location.pathname}
              onItemClick={(item) => {
                if (item.type === 'link') setDrawerOpen(false);
              }}
              level={1}
            />
          </div>
        </>
      )}

      {/* Desktop Layout */}
      <div className={styles.docPage}>
        {sidebar && windowSize === 'desktop' && (
          <DocPageLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}

        <DocPageLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocPageLayoutMain>
      </div>
    </Layout>
  );
}
