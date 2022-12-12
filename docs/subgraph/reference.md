---
sidebar_position: 1
---

# Subgraph reference
Fields recorded by the Panoptic subgraph. 

* account
  * positions
    * (position object)
  * userBalanceCross
  * userRequiredCross
  * userBalanceUSD
  * userRequiredUSD
* positions
  * tokenId
  * owner
  * positionSize
    * (tokenID info)
  * mintInfo
    * (mint txn)
    * userBalanceCross
    * userRequiredCross
    * userBalanceUSD
    * userRequiredUSD
  * burnInfo
    * (burn txn)
    * userBalanceCross
    * userRequiredCross
    * userBalanceUSD
    * userRequiredUSD
  * amountDepositedUSD
  * amountCollectedUSD
  * amountWithdrawnUSD
  * pool
    * (pool info)
* liquidations
  * positionSize
  * owner
  * liquidator
  * tokenIds
    * (tokenId info)
  * burns
    * (burn txn)
  * pool
    * (pool info)
* transactions
  * blockNumber
  * timestamp
  * gasPrice
  * gasUSed
  * id
  * mints
    * (mint txn)
  * burns
    * (mint txn)
  * deployTxn
    * (deploy txn)
  * liquidations
    * (liquidation txn)
* mints 
  * liquidity
  * tokenId
    * (tokenId info)
  * commissionRate
    * (commission object)
  * poolUtilization
    * (pool utilization) 
  * userCounter
  * owner
  * sender
* burns
  * liquidity
  * tokenId
    * (tokenId info)
  * premium0
  * premium1
  * premiumUSD
  * userCounter
  * owner
  * sender
* tokenId
  * poolId
  * leg0
    * (leg object)
  * leg1
    * (leg object)
  * leg2
    * (leg object)
  * leg3
    * (leg object)
* legs
  * optionRatio
  * numeraire
  * tokenType
  * isLong
  * riskPartner
  * strike
  * width
* chunks
  * owner
  * tickLower
  * tickUpper
  * netLiquidity
  * shortLiquidity
  * longLiquidity
  * shortCounts
  * longCounts
* pool
  * deployTxn
    * (deploy txn)
  * liquidityProvisions
    * (LP object)
  * liquidations
    * (liquidation object)
* liquidityProvisions
  * LPaddress
  * mints
    * (mint txn)
  * burns
    * (burn txn)
  chunks
    * chunks object)

