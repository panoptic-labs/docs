---
sidebar_position: 2
---

# Subgraph example queries
You can use these example queries on the Sepolia subgraph, deployed [here](https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-sepolia/beta7-prod/gn).

## Query open positions for an account in a Panoptic Pool

The [PanopticPoolAccount](./schema#panopticpoolaccount) entity is very helpful for inspecting account activity in Panoptic. Let's see how you would use it to fetch an account's open positions in a specific Panoptic Pool.

You'll need an account address and a Uniswap Pool address. Here's an example:

```graphql
query GetOpenPanopticPositionsByAccountAndUniswapPool{
  panopticPoolAccounts(
    where: {account: "0x7643c4f21661691fb851afedaf627695672c9fac", panopticPool_: {underlyingPool: "0xd4c8fb61a56e55e898288177272bdb556ab36b2a"}}
  ) {
    panopticPool {
      id
      underlyingPool {
        id
        token0 {
          name
        }
        token1 {
          name
        }
        feeTier
      }
    }

    accountBalances(
      first: 1000
      where: {isOpen: 1}
      orderBy: createdBlockNumber
      orderDirection: desc
    ) {
      createdBlockNumber
      isOpen
      positionSize
      tokenId {
        id
      }
      txnOpened {
        id
        eventType
        ... on OptionMint {
          hash
          timestamp
        }
      }
    }
  }
}
```

There are **two** key filters here that give us what we want:

1. The top-level filter on `PanopticPoolAccounts`:
```graphql
panopticPoolAccounts(
  where: {account: "0x7643c4f21661691fb851afedaf627695672c9fac", panopticPool_: {underlyingPool: "0xd4c8fb61a56e55e898288177272bdb556ab36b2a"}}
) {
```

The `account` input here filters for Panoptic Pool Accounts belonging to the given account - `0x7643c4f21661691fb851afedaf627695672c9fac`.

The nested filter: `panopticPool_: {underlyingPool: "0xd4c8fb61a56e55e898288177272bdb556ab36b2a"}` filters for the Panoptic Pool deployed on top of the Uniswap Pool at the address `0xd4c8fb61a56e55e898288177272bdb556ab36b2a`.

> If you know the specific Panoptic Pool address you want to query for, you can use this filter instead: `panopticPool: <panoptic_pool_address>`.

To see what else is available to query on PanopticPoolAccount, see its [schema docs](./schema#panopticpoolaccount).

2. The lower-level filter on `AccountBalances`:
```graphql
accountBalances(
  where: {isOpen: 1}
  orderBy: createdBlockNumber
  orderDirection: desc
) {
```

Notice how `accountBalances` in this query is a field of the `panopticPoolAccounts` entity. This ensures you get only `AccountBalances` (a.k.a. positions) owned by the specified account in the specified Panoptic Pool.

If you made a different query like:
```graphql
query {
  accountBalances(where: { sender:  '0x7643c4f21661691fb851afedaf627695672c9fac' })` {
    id
    # ...
  }
}
```
you could get back more results due to including positions created by directly interacting with the SFPM.

The rest of the filters are (hopefully!) obvious enough.

See the GraphiQL link above or the schema documentation for the [PanopticPoolAccount](./schema#panopticpoolaccount) and the [AccountBalance](./schema#accountbalance) entities to learn more about what's available.

