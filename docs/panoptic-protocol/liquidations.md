---
sidebar_position: 9
---

# Liquidations
Accounts can be margin called and liquidated.


## Collateral requirement
The amount of collateral needed to maintain an option open depends on the pool utilization at the time it was minted.


## Margin Calls
A position will be margin called if

    Total value of collateral / collateral requirement <= 100%

### Liquidation Bonus

```solidity

LIQUIDATION
_BONUS        ^  max bonus = 100%
       100% _ |___________
              |          .¯-_
              |          .   ¯-_                   no cost at 100% capitalization
              |          .      ¯-_             /
              |          .         ¯-_        /
              |          .            ¯-_  /
         0% - +-//-------+---------------+---------------+---------->    MIN_CAPITAL_REQUIREMENT
              |        80%            100% ¯-_         120%
              |                               ¯-_        .
              |                                  ¯-_     .
              |                                     ¯-_  .     min bonus = -100%
      -100% - |                                        ¯-_______________
              |
```

### Force exercise cost

```solidity

EXERCISE
_COST         ^   max cost = 10.24%
 60+1024bps _ |____
  60+512bps _ |    |____
  60+256bps _ |    .    |____
  60+128bps _ |    .    .    |____
   60+64bps _ |    .    .    .    |____
   60+32bps _ |    .    .    .    .    |____
   60+16bps _ |    .    .    .    .    .    |____
    60+8bps _ |    .    .    .    .    .    .    |____
    60+4bps _ |    .    .    .    .    .    .    .    |____
    60+2bps _ |    .    .    .    .    .    .    .    .    |____    min cost = 0.01%
    60+1bps _ |    .    .    .    .    .    .    .    .    .    |____
              +----+----+----+----+----+----+----+----+----+----+--->
                  1x   2x   3x   4x   5x   6x   7x   8x   9x  10x    DISTANCE_FROM_STRIKE
                                                                      (number of "widths")

```


