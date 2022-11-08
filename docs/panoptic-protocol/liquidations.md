---
sidebar_position: 10
---

# Liquidations
Accounts can be margin called and liquidated.


## Margin Calls
A position will be margin called if

```
    Total value of collateral  < collateral requirement 
```

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


