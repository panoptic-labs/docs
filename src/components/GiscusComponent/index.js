import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
      <Giscus 
        repo="panoptic-labs/docs"              // Your GitHub repository
        repoId="R_kgDOH9NNlw"                  // Your GitHub repository ID
        category="Announcements"               // Your GitHub discussion category
        categoryId="DIC_kwDOH9NNl84ChXl2"      // Your GitHub discussion category ID
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}                      // Use colorMode for theming
        lang="en"
        // loading="lazy"
        crossorigin="anonymous"
        async
      />
  );
}
