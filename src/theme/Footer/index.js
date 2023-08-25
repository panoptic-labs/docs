import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';

import { default as FooterComponent } from '../../components/other/Footer';
function Footer() {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  return (
    <FooterComponent/>
  );
}
export default React.memo(Footer);
