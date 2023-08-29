import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css'
export default function MDXA(props) {
  return <Link className={styles.link} {...props} />;
}
