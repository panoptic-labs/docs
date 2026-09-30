const fs = require("node:fs/promises");
const path = require("node:path");
const { createHash } = require("node:crypto");
const {
  getIntrospectionQuery,
  buildClientSchema,
  lexicographicSortSchema,
  printSchema,
} = require("graphql");
const renderSchema = require("graphql-markdown/src/renderSchema");

const docsRoot = path.join(__dirname, "..");
const networks = [
  { name: "Ethereum", slug: "mainnet", chainId: "1", file: "schema.md" },
  {
    name: "Robinhood",
    slug: "robinhood",
    chainId: "4663",
    file: "schema-robinhood.md",
  },
].map((network) => ({
  ...network,
  endpoint: `https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-${network.slug}/v2_prod/gn`,
}));

async function request(endpoint, query, variables = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(60_000),
  });
  if (!response.ok) throw new Error(`Subgraph HTTP ${response.status}`);
  const result = await response.json();
  if (result.errors?.length || !result.data) {
    throw new Error(JSON.stringify(result.errors ?? "Missing GraphQL data"));
  }
  return result.data;
}

async function loadProductionSchemas() {
  return Promise.all(
    networks.map(async (network) => {
      const introspection = await request(
        network.endpoint,
        getIntrospectionQuery(),
      );
      const schema = buildClientSchema(introspection);
      const { _meta } = await request(
        network.endpoint,
        "{ _meta { deployment hasIndexingErrors block { number hash } } }",
      );
      if (!_meta || _meta.hasIndexingErrors)
        throw new Error(`${network.name}: indexer is not healthy`);
      const hash = createHash("sha256")
        .update(printSchema(lexicographicSortSchema(schema)))
        .digest("hex");
      return { ...network, introspection, schema, meta: _meta, hash };
    }),
  );
}

function renderReference(network) {
  const lines = [];
  const mdxSafe = JSON.parse(
    JSON.stringify(network.introspection, (key, value) => {
      if (
        (key !== "description" && key !== "deprecationReason") ||
        typeof value !== "string"
      )
        return value;
      return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("{", "&#123;")
        .replaceAll("}", "&#125;");
    }),
  );
  renderSchema(mdxSafe, {
    skipTitle: true,
    skipTableOfContents: true,
    printer: (line) => lines.push(line),
  });
  const typeNames = new Set(
    network.introspection.__schema.types.map((type) => type.name),
  );
  const markdown = lines
    .join("\n")
    .replace(/^(#{2,3}) (\w+)$/gm, (heading, depth, name) =>
      typeNames.has(name)
        ? `${depth} \`${name}\` {#${name.toLowerCase().replace(/^_+|_+$/g, "")}}`
        : heading,
    )
    .replace(
      /href="#(_\w*_)"/g,
      (_, anchor) => `href="#${anchor.replace(/^_+|_+$/g, "")}"`,
    );
  return `---
sidebar_position: ${network.slug === "mainnet" ? 2 : 3}
sidebar_label: ${network.name} schema
---

# ${network.name} v2_prod subgraph schema

Generated from the [${network.name} production endpoint](${network.endpoint}) (chain ID ${network.chainId}). See [endpoints, query examples, and indexing caveats](./queries) before using these entities for account discovery.

- Deployment: \`${network.meta.deployment}\`
- Schema SHA-256: \`${network.hash}\`
- Regenerate both production references: \`pnpm --filter @panoptic-eng/docs graphql-markdown\`.

This reference preserves descriptions returned by the endpoint. Some descriptions are outdated: in particular, do not interpret \`panopticVersion\` as a reliable protocol-version filter. Entity relationships can also fail to resolve even when the indexer reports no indexing errors. Contract state remains authoritative for balances, risk parameters, and transaction validation.

The two production schemas can differ. Use the reference for your chain: [Ethereum](./schema), [Robinhood](./schema-robinhood).
${markdown}
`
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

async function generate() {
  const references = (await loadProductionSchemas()).map((network) => ({
    file: path.join(docsRoot, "docs/subgraph", network.file),
    content: renderReference(network),
  }));
  for (const reference of references) {
    await fs.writeFile(reference.file, reference.content);
    console.log(`Generated ${path.basename(reference.file)}`);
  }
}

module.exports = { docsRoot, request, loadProductionSchemas, renderReference };
if (require.main === module)
  generate().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
