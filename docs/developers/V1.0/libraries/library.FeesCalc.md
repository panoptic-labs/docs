# FeesCalc
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/libraries/FeesCalc.sol)

**Author:**
Axicon Labs Limited

Compute fees accumulated within option position legs (a leg is a liquidity chunk).

*Some options positions involve moving liquidity chunks to the AMM/Uniswap. Those chunks can then earn AMM swap fees.*


## Functions
### calculateAMMSwapFees

Calculate the AMM swap fees accumulated by the `liquidityChunk` in each token of the pool.

*Read from the Uniswap pool and compute the accumulated fees from swapping activity.*


```solidity
function calculateAMMSwapFees(
    IUniswapV3Pool univ3pool,
    int24 currentTick,
    int24 tickLower,
    int24 tickUpper,
    uint128 liquidity
) public view returns (LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`IUniswapV3Pool`|The AMM/Uniswap pool where fees are collected from|
|`currentTick`|`int24`|The current price tick|
|`tickLower`|`int24`|The lower tick of the chunk to calculate fees for|
|`tickUpper`|`int24`|The upper tick of the chunk to calculate fees for|
|`liquidity`|`uint128`|The liquidity amount of the chunk to calculate fees for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The fees collected from the AMM for each token (LeftRight-packed) with token0 in the right slot and token1 in the left slot|


### _getAMMSwapFeesPerLiquidityCollected

Calculates the fee growth that has occurred (per unit of liquidity) in the AMM/Uniswap for an
option position's tick range.

*Extracts the feeGrowth from the Uniswap V3 pool.*


```solidity
function _getAMMSwapFeesPerLiquidityCollected(
    IUniswapV3Pool univ3pool,
    int24 currentTick,
    int24 tickLower,
    int24 tickUpper
) internal view returns (uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`IUniswapV3Pool`|The AMM pool where the leg is deployed|
|`currentTick`|`int24`|The current price tick in the AMM|
|`tickLower`|`int24`|The lower tick of the option position leg (a liquidity chunk)|
|`tickUpper`|`int24`|The upper tick of the option position leg (a liquidity chunk)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeGrowthInside0X128`|`uint256`|The fee growth in the AMM of token0|
|`feeGrowthInside1X128`|`uint256`|The fee growth in the AMM of token1|


