import React from "react";
import Head from "@docusaurus/Head";
import entities from "../data/entities.cjs";

export default function StructuredData({ data }) {
  return (
    <Head>
      <script type="application/ld+json">
        {entities.serializeJsonLd(data)}
      </script>
    </Head>
  );
}
