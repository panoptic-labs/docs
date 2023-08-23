---
sidebar_position: 5
label: Streamia
---

# Streamia (Streaming Premia)

## Fees tracking in Uniswap

### Fees tracking per swap

Each `UniswapV3Pool` uses global accumulators called `feeGrowthGlobal0X128` and `feeGrowthGlobal1X128` to track the fees owed for each position in terms of `token0` and `token1`. 

Every time a swap happens inside a Uniswap pool that does not change the price beyond a single tick, the accumulator is incremented by the amount of fees generated per unit of total liquidity present inside that tick. 
If the swap crosses a tick, the `UniswapV3Pool` stores the amount of fees collected up to that point for that specific tick range.

### Fees tracking per mint

When a new position is minted in `UniswapV3Pool`, the users needs to specify a range defined by `tickLower` and `tickUpper`. 
At minting time, the `UniswapV3Pool` smart contract stores two values called `feeGrowthInside0LastX128` and `feeGrowthInside1LastX128`, which are given by the values of the global fee accumulators. 

When a position is burnt, the amount of fees to be collected is computed from the `feeGrowthInside0LastX128` and `feeGrowthInside1LastX128` values stored when the position was minted and the current fees at the ticks given by `feeGrowthGlobal0X128` and `feeGrowthGlobal1X128`


```python
def computeUniswapFees(tickLower, tickUpper, liquidity):
    
    # Read the last recorded feeGrowth quantities
    (feeGrowthInside0LastX128, feeGrowthInside1LastX128) = pool.positions(keccak256(abi.encodePacked(msg.sender, tickLower, tickUpper)))

    # Read the current feeGrowth quantities
    (feeGrowthGlobal0X128, feeGrowthGlobal0X128) = (pool.feeGrowthGlobal0X128, )
    
    # Compute the tokens owed for the amount of liquidity for that position
    tokensOwed0 = ((feeGrowthGlobal0X128 - feeGrowthInside0LastX128) * liquidity) / FixedPoint128.Q128
    tokensOwed1 = ((feeGrowthGlobal1X128 - feeGrowthInside1LastX128) * liquidity) / FixedPoint128.Q128    

```

## Liquidity tracking in Panoptic

### Liquidity in "Chunks"
Each option position in Panoptic is created by moving liquidity in or out of the `UniswapV3Pool.sol` smart contract. Each "chunk" of liquidity will have a few properties associated with it: 

- token type
- lower tick
- upper tick
- liquidity


One extra parameter that is only present in Panoptic is the `tokenType`, which refers to the type of token that was moved (either `token0` or `token1`), assuming the position was out-the-money.

Since multiple users can create the same position but each using a different size, each option position in Panoptic is "semi-fungible".
The set of (`tokenType`, `tickLower`, `tickUpper`) defines a specific location in the UniswapV3Pool, and the `liquidity` amount determines how many tokens have been moved.

### Short and Net liquidity

In Panoptic, we track two types of liquidity for each chunk: 

- `netLiquidity`: Amount of liquidity currently sitting in Uniswap 
- `shortLiquidity`: Amount of liquidity that has been removed from Uniswap through the minting of long options

Together, these two quantities can be combined to compute the amount of `totalLiquidity` that has been deposited to that chunk as:

`totalLiquidity = netLiquidity + shortLiquidity`


```python
_netLiquidity = {}
_shortLiquidity = {}

def getAccountLiquidity(univ3pool, owner, tokenType, tickLower, tickUpper):
    
    positionKey = keccak256(abi.encodePacked(univ3pool, owner, tokenType, tickLower, tickUpper))
    
    netLiquidity = _netLiquidity[positionKey]
    shortLiquidity = _shortLiquidity[positionKey]

    
```

## Fees tracking in Panoptic


### Net, Gross, and Owed fees (no spread)


Any liquidity that has been deposited in the AMM using the SFPM will collect fees over time, we call this the `gross` premia. If that liquidity has been removed, we also need to keep track of the amount of fees that *would have been collected*, and we call this the `owed` premia. The `gross` and `owed` premia are tracked per unit of liquidity by the `s_accountPremiumGross` and `s_accountPremiumOwed` accumulators. 

Here is how we can use the accumulators to compute the `Gross`, `Net`, and `Owed` fees collected by any position.

Let's say user A deposited `T` at a specific tick range into Uniswap v3 and user B later removed `S` from that same tick. Because the netLiquidity left inside that tick range is only `(T-S)`, the AMM will collect fees equal to:

`net_feesCollectedX128 = feeGrowthX128 * (T-S) = feeGrowthX128 * N`

where `N = netLiquidity = T-S`. 

Had that liquidity never been removed, we want the `gross` premia to be given by:

`gross_feesCollectedX128 = feeGrowthX128 * T`
      
So we must keep track of fees for the shorted (ie. removed) liquidity `S` so that the long premia exactly compensates for the fees that would have been collected from the initial liquidity. 

`owed_feesCollectedX128 = feeGrowthX128 * S`

### Net, Gross, and Owed fees (with spread)

In addition to tracking the actual fees owed, we also want to include a small spread to be paid by the user that remove the liquidity. Specifically, we want:

`gross_feesCollectedX128 = net_feesCollectedX128 + owed_feesCollectedX128`

where 

`owed_feesCollectedX128 = feeGrowthX128 * S * (1 + spread)`


A very opinionated definition for the spread is: 


`spread = ν*(liquidity removed from that strike)/(netLiquidity remaining at that strike) = ν*S/N `

so that we get

`owed_feesCollectedX128 = feeGrowthX128 * S * (1 + ν*S/N)` (Eqn 1)

     
For an arbitraty parameter ν bounded by 0 <= ν <= 1. 

This way, the `gross_feesCollectedX128` will be given by: 

`gross_feesCollectedX128 = feesGrowthX128 * N + feesGrowthX128*ν*S*(1 + S/N)`

which, upon simplification, yields

`gross_feesCollectedX128 = feesGrowthX128 * T * (1 + ν*S^2/(N*T))`  (Eqn 2)


## Fee Accumulators

The two equations above represent the amount of fees paid by an option buyer (Eqn 1) and the amount of fees collected by all the liquidity that was deposited at that tick (Eqn 2).
In the next two sections, we will describe how we constructed the accumulator that is used by the Panoptic Pool to keep track of these amounts per units of liquidity.


### Expressions for the owed premium accumulator

The `s_accountPremiumOwed` accumulator tracks the `feeGrowthX128 * S * (1 + spread)` term per unit of shorted liquidity `S` every time the position touched:


```js
s_accountPremiumOwed += feeGrowthX128 * S * (1 + ν*S/N) / S
                     += feeGrowthX128 * (T - S*(1-ν))/N
                     += feeGrowthX128 * T/N * (1 - S*(1-ν)/T)
```

So, the amount of owed premia for a position of size `S` minted at time `t1` and burnt at 
time `t2` is:

```
owedPremia(t1, t2) = (s_accountPremiumOwed_t2-s_accountPremiumOwed_t1) * S
                    = ∆feesGrowthX128 * S*T/N * (1 - S*(1-ν)/T)
                    = ∆feesGrowthX128 * S * (T - S + ν*S)/N
                    = ∆feesGrowthX128 * S * (N + ν*S)/N
                    = ∆feesGrowthX128 * S * (1 + ν*S/N)             (same as Eqn 1)
```
                        
                        
This way, the amount of premia owed for a position will match Eqn 1 exactly.

### Expressions for the gross premium accumulator

Similarly, the amount of gross fees for the total liquidity is tracked in a similar manner by the `s_accountPremiumGross` accumulator. However, since we require that Eqn 2 holds up-- ie. the gross fees collected should be equal to the net fees collected plus the ower fees  plus the small spread, the expression for the `s_accountPremiumGross` accumulator has be be given by the expression below, which includes a `S^2/T^2` term (you'll see why in a minute):

`s_accountPremiumGross += feeGrowthX128 * T/N * (1 - S/T + ν*S^2/T^2)`

This expression can be used to calculate the fees collected by a position between times
t1 and t2 according to:

```
grossPremia(t1, t2) = ∆(s_accountPremiumGross) * T
                     = ∆feeGrowthX128 * T^2/N * (1 - S/T + ν*S^2/T^2)
                     = ∆feeGrowthX128 * T * (T - S + ν*S^2/T) / N
                     = ∆feeGrowthX128 * T * (N + ν*S^2/T) / N
                     = ∆feeGrowthX128 * T * (1  + ν*S^2/(N*T))   (same as Eqn 2)
```
where the last expression matches Eqn 2 exactly.   


Therefore, the `s_accountPremiumOwed` and `s_accountPremiumGross` accumulators allow smart contracts that need to handle long+short liquidity to guarantee that liquidity deposited always receives the correct
premia, whether that liquidity has been removed from the AMM or not.

Note that the expression for the spread is extremely opinionated, and may not fit the specific risk management profile of every smart contract. 


