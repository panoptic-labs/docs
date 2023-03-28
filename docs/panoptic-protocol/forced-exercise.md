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


