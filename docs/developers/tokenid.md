---
sidebar_position: 7
---

# TokenId (ERC1155)

In Panoptic, every option position is represented by a unique ID. This ID is a uint256 which contains 256 bits. In addition, an option position is represented internally as an ERC1155 semi-fungible NFT which is gas efficient for our users.

Details about the position are encoded into the ID in the following format:

```solidity num
/*
* This is how the token Id is packed into its bit-constituents containing position information.
* The following is a diagram to be read top-down in a little endian format
* (so (1) below occupies the first 80 least significant bits, e.g.):
* ===== 1 time (same for all legs) ==============================================================
* (1) univ3pool        80bits  : first 10 bytes of the Uniswap v3 pool address (first 80 bits; little-endian)
* ===== 4 times (one for each leg) ==============================================================
*      Property         Size                 Comment
* (2) optionRatio       3+1 bits             : 3 bits for number of contracts per leg, leftmost bit for specifying the numeraire
* ===== 4 times (one for each leg) ==============================================================
*      Property         Size    Rel.Start     Comment
* (3) isLong            1bit      0bits      : long==1 means liquidity is removed, long==0 -> liquidity is added
* (4) tokenType         1bit      1bit       : put/call: which token is moved when deployed (0 -> token0, 1 -> token1)
* (5) riskPartner       2bits     2bits      : normally its own index. Partner in defined risk position otherwise
* (6) strike           24bits     4bits      : strike price; defined as (tickUpper + tickLower) / 2
* (7) width            12bits    28bits      : width; defined as (tickUpper - tickLower) / 2
* Total                40bits                : Each leg takes up this many bits
* ===============================================================================================
*
* The bit pattern is therefore in general (the numbers in parentheses refer to the above table):
*
*                                                                           (optionRatio of the third leg, e.g.)
*                                                                                  |
*     (7)(6)(5)(4)(3)   (7)(6)(5)(4)(3)  (7)(6)(5)(4)(3)   (7)(6)(5)(4)(3)     (2)(2)(2)(2)            (1)
*    <-- 40 bits --->  <-- 40 bits --->  <-- 40 bits -->   <-- 40 bits -->     <- 16bits ->        <- 80 bits ->
*         Leg 4             Leg 3             Leg 2             Leg 1          optionRatios      Univ3 Pool Address
*
*                          <--- most significant bit                   least significant bit --->
*/
```

This entire pattern is then, when interpreted as a uint256, a unique ID of that position.

## Examples

Let's cover a few examples to drive home the design. First, we can think of the bit pattern as an array starting at bit index 0 going to bit index 255 (so 256 total bits).
Second, in general leg number N (the Nth leg) has leg index N-1.

<ul>
<li>the underlying strike price of the 2nd leg in this option position starts at bit index  (80 + 16 + 40 * (leg index=1) + 4)=140</li>
<li>the tokenType of the 4th leg in this option position starts at bit index 80+16+40*3+1=217</li>
<li>the Uniswap v3 pool address starts at bit index 0 and ends at bit index 79 (inclusive)</li>
<li>the width of the 3rd leg in this option position starts at bit index 80+16+40*2+28=204</li>
</ul>
and so on.

In general, Panoptic uses the tokenId library to store and extract information from within this bit pattern. Similarly, we can store into the pattern as well and thus we can both read and write to this.
