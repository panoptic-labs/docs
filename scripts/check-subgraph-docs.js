const fs = require("node:fs/promises");
const path = require("node:path");
const assert = require("node:assert/strict");
const { parse, validate } = require("graphql");
const {
  docsRoot,
  request,
  loadProductionSchemas,
  renderReference,
} = require("./gen-subgraph-docs");

async function check() {
  const page = await fs.readFile(
    path.join(docsRoot, "docs/subgraph/queries.md"),
    "utf8",
  );
  const queries = [...page.matchAll(/```graphql\n([\s\S]*?)\n```/g)].map(
    (match) => ({
      text: match[1],
      document: parse(match[1]),
    }),
  );
  assert.equal(queries.length, 4, "Expected all four documented operations");
  for (const network of await loadProductionSchemas()) {
    const reference = await fs.readFile(
      path.join(docsRoot, "docs/subgraph", network.file),
      "utf8",
    );
    assert.ok(
      reference === renderReference(network),
      `${network.name}: regenerate the schema reference`,
    );
    const blockHash = network.meta.block.hash;
    assert.match(blockHash, /^0x[0-9a-fA-F]{64}$/);
    const seed = await request(
      network.endpoint,
      `query Seed($blockHash: Bytes!) {
      accountBalances(first: 1, where: {isOpen: 1, panopticPoolAccount_not: null}, block: {hash: $blockHash}) {
        panopticPoolAccount { id }
      }
    }`,
      { blockHash },
    );
    const poolAccount = seed.accountBalances[0]?.panopticPoolAccount?.id;
    assert.ok(
      poolAccount,
      `${network.name}: no real open pool account available to verify examples`,
    );
    const account = poolAccount.split("#")[0];
    for (const query of queries) {
      assert.deepEqual(validate(network.schema, query.document), []);
      const variables = { blockHash, after: "", account, poolAccount };
      const data = await request(network.endpoint, query.text, variables);
      const operation = query.document.definitions[0].name.value;
      if (operation === "IndexingStatus") {
        assert.equal(data._meta.hasIndexingErrors, false);
      } else {
        const records = Object.values(data)[0];
        assert.ok(
          records.length > 0,
          `${network.name}: ${operation} returned no verification records`,
        );
        if (operation === "OpenPositions") {
          for (const record of records) {
            assert.ok(BigInt(record.positionSize) > 0n);
            assert.ok(BigInt(record.tokenId.id) >= 0n);
          }
        }
        const after = records.at(-1).id;
        const next = await request(network.endpoint, query.text, {
          ...variables,
          after,
        });
        for (const record of Object.values(next)[0])
          assert.ok(record.id > after);
      }
      console.log(
        `${network.name}: ${operation} passed at block hash ${blockHash}`,
      );
    }
  }
}

check().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
