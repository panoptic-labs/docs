---
sidebar_position: 11
---

# Forced Exercise
How far-the-money options can be exercised by external users.


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


