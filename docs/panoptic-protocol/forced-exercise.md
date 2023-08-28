---
sidebar_position: 12
---

# Forced Exercise
How far-the-money options can be exercised by external users.

### Force Exerciser (Anybody)
Given that Panoptions are expirationless, option buyers may hold their position to perpetuity. In order to prevent option sellers from becoming locked into their position forever, option sellers (or any external party) may force exercise an option buyer's position at any time for a fee. The farther-the-money, the cheaper it is to force exercise an option position.

### Force Exercisee (Buyer)
For Panoptions, there is a risk that a long option position may be forced to close due to an external party exercising the option. The long option holder receives a [fee](/docs/panoptic-protocol/forced-exercise#forced-exercise-cost) as compensation.  

To mitigate forced exercise risk, it is important to monitor positions closely and be prepared to adjust or close the position if needed.

### Single-leg positions
For single-leg positions, only long positions may be force exercised. Short positions cannot be force exercised.

### Multi-leg positions
For multi-leg positions, force exercising must close all legs of the position.

### Forced Exercise Cost

```solidity

EXERCISE
_COST         ^   max cost = 10.24%
 1024bps _ |____
  512bps _ |    |____
  256bps _ |    .    |____
  128bps _ |    .    .    |____
   64bps _ |    .    .    .    |____
   32bps _ |    .    .    .    .    |____
   16bps _ |    .    .    .    .    .    |____
    8bps _ |    .    .    .    .    .    .    |____
    4bps _ |    .    .    .    .    .    .    .    |____
    2bps _ |    .    .    .    .    .    .    .    .    |____    min cost = 0.01%
     1bp _ |    .    .    .    .    .    .    .    .    .    |____
              +----+----+----+----+----+----+----+----+----+----+--->
                  1x   2x   3x   4x   5x   6x   7x   8x   9x  10x    DISTANCE_FROM_STRIKE
                                                                      (number of "widths")

```

'Width' is characterized by the tick spacing of the underlying Uniswap pool, which differs depending on each Uniswap pool's fee tier. This is illustrated by the following relationships:

- For a fee tier of 1 basis point (bp): width = 1 tick.
- For a fee tier of 5 basis points (bps), width = 10 ticks.
- For a fee tier of 30 basis points (bps), width = 60 ticks.
- For a fee tier of 100 basis points (bps), width = 200 ticks.

Note: Uniswap v3 currently has four distinct fee tiers.

The conversion from tick to price can be calculated using the formula:

$Price = 1.0001 ^{Ticks}$

Let's consider an example using a Panoptic pool built over a Uniswap v3 pool with a fee tier of 30 basis points (bps). Here, 1 'width' corresponds to 60 ticks. Suppose the strike price is \$991.93 (= $1.0001 ^ {69,000}$) and the spot price is \$997.90 (= $1.0001 ^ {69,060}$). In this scenario, the spot price would be considered 1 'width' away from the strike price due to the 60 ticks difference.
