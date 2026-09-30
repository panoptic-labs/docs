---
sidebar_position: 1
sidebar_label: Production queries
---

# V2 production subgraph queries

Use the subgraph for indexed history and account/pool discovery. Read contracts through the [v2 SDK](../developers/v2-integration) to confirm current positions, collateral, the pool's RiskEngine, and transaction validity. The SDK's v2 protocol reads and writes use RPC; your application can use a subgraph separately for discovery.

## Endpoints

| Chain | Chain ID | Endpoint | Schema |
| --- | --- | --- | --- |
| Ethereum | 1 | [panoptic-subgraph-mainnet/v2_prod](https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-mainnet/v2_prod/gn) | [Ethereum reference](./schema) |
| Robinhood | 4663 | [panoptic-subgraph-robinhood/v2_prod](https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-robinhood/v2_prod/gn) | [Robinhood reference](./schema-robinhood) |

Send an HTTP POST with `Content-Type: application/json` and a JSON body containing `query`, `variables`, and optionally `operationName`. These public endpoints do not require an API key. Sepolia examples and the older `beta7-prod` endpoint are not the production v2 integration target.

## Check freshness and errors

```graphql
query IndexingStatus {
  _meta {
    deployment
    hasIndexingErrors
    block { number hash }
  }
}
```

Check the HTTP status **and** GraphQL `errors`; HTTP 200 does not imply success. Reject errored or partial results rather than treating them as an empty portfolio. Compare `_meta.block.number` and hash with your chain RPC, account for reorgs, and define an acceptable lag for your application. `hasIndexingErrors: false` alone does not prove that every relationship resolves.

For a consistent paginated snapshot, capture `_meta.block.hash` once and pass that same value as `blockHash` to every page and collection below, using `block: { hash: $blockHash }`. Both production endpoints support this selector. Keep the same endpoint and deployment throughout pagination. A block hash pins block identity, not finality; discard all accumulated pages and restart if the block is reorganized or unavailable.

If an endpoint does not support block-hash queries, obtain a finalized block's number and hash from the chain RPC (`eth_getBlockByNumber` with `"finalized"` where supported, otherwise the chain's documented finality mechanism). Wait until the indexer has reached that block, then pin every page to its number using `block: { number: $blockNumber }` with `$blockNumber: Int!`. Verify that the RPC still returns the recorded hash at that number before each page and again before combining page results. Compare the indexer's hash too when available; `_meta(block: { number: ... }).block.hash` can be null, which is not hash verification. Discard the pages on any mismatch or error, and do not combine results if finality or the block hash cannot be verified.

## Discover pools

```graphql
query DiscoverPools($after: ID!, $blockHash: Bytes!) {
  panopticPools(
    first: 100
    orderBy: id
    orderDirection: asc
    where: { id_gt: $after }
    block: { hash: $blockHash }
  ) {
    id
    panopticVersion
    riskEngine { id }
    underlyingPool { id isV4Pool }
  }
}
```

Start with `after: ""`. Use the last returned `id` for the next page until the result is empty. The returned `id` is the **PanopticPool address**. An underlying Uniswap v4 pool ID is a different identifier and must not be passed as a PanopticPool address.

Discovering a pool does not mean it uses an active RiskEngine. Compare its engine with the [documented deployments](../contracts/deployment-addresses) and verify `riskEngine()` on-chain. The endpoint may retain pools using deprecated engines.

**Version-field caveat:** production records sampled on September 28, 2026 returned `panopticVersion: "3"` or `"4"` for v2 pools, despite the schema description listing `1`, `1.1`, and `2`. Filtering these endpoints with `panopticVersion: "2"` returned no pools in that check. Do not use that filter to discover v2 positions, or interpret these values as Panoptic protocol v3/v4. Confirm the deployment and AMM type independently.

## Discover an account's pools

```graphql
query DiscoverAccounts($account: String!, $after: ID!, $blockHash: Bytes!) {
  panopticPoolAccounts(
    first: 100
    orderBy: id
    orderDirection: asc
    where: { account: $account, id_gt: $after }
    block: { hash: $blockHash }
  ) {
    id
    panopticPool { id }
    collateral0Shares
    collateral1Shares
  }
}
```

Pass the lowercased wallet address as `account`. Paginate using the same cursor method. A `PanopticPoolAccount` may represent collateral activity without an open option position. Its collateral fields are share counts, not underlying token balances or current buying power. Its `id` has the documented form `accountAddress#panopticPoolAddress`; prefer the returned ID when querying its positions.

The example filters on the stored account relationship without selecting `account { id }`. During production verification, some records returned `Null value resolved for non-null field account` for that selection on both chains. This is a data-quality gap, not proof that the wallet has no positions. Other relationship errors must also be handled explicitly.

## Query open positions for one pool account

```graphql
query OpenPositions($poolAccount: String!, $after: ID!, $blockHash: Bytes!) {
  accountBalances(
    first: 100
    orderBy: id
    orderDirection: asc
    where: { panopticPoolAccount: $poolAccount, isOpen: 1, id_gt: $after }
    block: { hash: $blockHash }
  ) {
    id
    positionSize
    tokenId { id }
    createdBlockNumber
  }
}
```

Pass a returned `PanopticPoolAccount.id` as `poolAccount`. Querying the top-level `accountBalances` collection allows independent pagination without silently truncating a nested list. Filtering only by `sender` can include direct SFPM positions outside the intended Panoptic pool.

`isOpen: 1` selects indexed open records; `0` means closed and `2` is a placeholder state, according to the production schema. GraphQL `BigInt` values arrive as decimal strings. Convert `positionSize`, `createdBlockNumber`, and the numeric `tokenId.id` with JavaScript `BigInt`, not `Number`. The entity's composite `AccountBalance.id` is not the numeric TokenId.

An empty result is only an indexed observation at that block. Before a write, reconstruct/reconcile the complete current position list via RPC and verify the account's state. Do not submit a partial or stale list as `existingPositionIds`.

## Maintaining these examples

`pnpm --filter @panoptic-eng/docs test:subgraph` validates every GraphQL block on this page against both live production schemas, executes the queries with real discovered pool accounts, and checks that both generated references match introspection. Regenerate references with `pnpm --filter @panoptic-eng/docs graphql-markdown` when a deployment changes. Ordinary docs builds use the checked-in references and require no subgraph access.
