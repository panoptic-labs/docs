import React from "react";
import { editorialDate } from "@site/src/utils/editorialDate.mjs";
import StructuredData from "../../../components/StructuredData";
import entities from "../../../data/entities.cjs";
import { PageMetadata } from "@docusaurus/theme-common";
import { useBlogPost } from "@docusaurus/theme-common/internal";
export default function BlogPostPageMetadata() {
  const { assets, metadata } = useBlogPost();
  const { title, description, date, tags, authors, frontMatter } = metadata;
  const { keywords } = frontMatter;
  const update = editorialDate(frontMatter.editorial_update);
  const image = assets.image ?? frontMatter.image;
  return (
    <>
      <StructuredData
        data={entities.articleGraph(metadata, image, update?.date)}
      />
      <PageMetadata
        title={title}
        description={description}
        keywords={keywords}
        image={image}
      >
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={date} />
        {update && (
          <meta property="article:modified_time" content={update.date} />
        )}
        {authors.some((author) => author.url) && (
          <meta
            property="article:author"
            content={authors
              .map((author) => author.url)
              .filter(Boolean)
              .join(",")}
          />
        )}
        {tags.length > 0 && (
          <meta
            property="article:tag"
            content={tags.map((tag) => tag.label).join(",")}
          />
        )}
      </PageMetadata>
    </>
  );
}
