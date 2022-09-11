---
sidebar_position: 7
---

# Liquidations
Accounts can be margin called and liquidated.


## Collateral requirement
The amount of collateral needed to maintain an option open depends on the pool utilization at the time it was minted.


## Margin Calls
A position will be margin called if

    Total value of collateral / collateral requirement <= 100%



## Liquidations Process

|collateralization (%) |<50|50|60|70|80|90|100|110|120|130|140|150|...|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|liquidation bonus (%) |100|100|86|71|57|43|28|14|0|-14|-28|-43|...|

## Forced Exercise

|distance from strike (minTickSpacing) | 0|1|2|3|4|5|6|7|8|9|10|>10|
|-|-|-|-|-|-|-|-|-|-|-|-|-|
|cost (bps) |1024|512|256|128|64|32|16|8|4|2|1|1|

