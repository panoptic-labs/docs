import React, { useLayoutEffect } from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import styles from './styles.module.css';

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }) {
const {
navbar: { hideOnScroll },
docs: {
sidebar: { hideable },
},
} = useThemeConfig();

// Use layout effect to avoid paint delay
useLayoutEffect(() => {
document.body.classList.add('preload-doc-sidebar');
return () => {
document.body.classList.remove('preload-doc-sidebar');
};
}, []);

return (
<div
className={clsx(
styles.sidebar,
hideOnScroll && styles.sidebarWithHideableNavbar,
isHidden && styles.sidebarHidden
)}
>
{hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />} <Content path={path} sidebar={sidebar} />
{hideable && <CollapseButton onClick={onCollapse} />} </div>
);
}

export default DocSidebarDesktop;
