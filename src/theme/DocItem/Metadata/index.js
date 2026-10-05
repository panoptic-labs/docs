import React from 'react';
import {editorialDate} from '@site/src/utils/editorialDate.mjs';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
export default function DocItemMetadata() {
  const {metadata, frontMatter, assets} = useDoc();
  const update = editorialDate(frontMatter.editorial_update);
  return (
    <PageMetadata
      title={metadata.title}
      description={metadata.description}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}
    >
      {update && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            dateModified: update.date,
          })}
        </script>
      )}
    </PageMetadata>
  );
}
