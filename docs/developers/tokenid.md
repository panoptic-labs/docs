---
sidebar_position: 7
---

# TokenId

In Panoptic, every option position is represented by a unique ID. This ID is a uint256 and thus contains 256 bits. The reason is is referred to as an "ID" is because it is the ID of an ERC1155 semi-fungible NFT.

Taking a step back, in Uniswap V3 an LP position is represented as an NFT also with a unique ID. This gives each LP a unique position and the NFT represents this.
In our case, it would be more beneficial and gas efficient to represent option positions by ERC115s and here is why: An ERC1155 can hold an element with a unique ID. But multiple users can hold a copy of this ID.
The classic example is a sword in a video game. There is a single type of sword (the ID), but multiple people can own it (multiple users per ID).
Similarly, there is a single type of option position (and thus we don't tie it to the initial creator of the position, we track that simply via `balanceOf`) but multiple users could hold it simultaneously. This also means that we get access to other gas saving features like batch minting and burning, etc. In comparison, Uniswap V3 uses an ERC721 NFT to represents a position and uses the LP's address as part of its ID (so 1 position has 1 owner at most always; therefore, if multiple users provide liquidity in the exact same range, multiple separate NFTs need to be minted one at a time).

Having explained what the tokenId is and what it represents, we also mentioned its number of bits. Why? Well this is very important because it is here that the details of the option position lies.
Specifically, first we realize that the option position is with respect to a specific Uniswap V3 pool. Thus, we take the first 10 bytes (80 bits) of that address and use for the first 80 bits starting at the least significant bit (LSB, in a big endian format).

Then, we follow that up with 4 bits per potential leg which consists of 3 bits quantifying the `optionRatio` and 1 bit for the `numeraire` identifier (the bit is 0/1 if token0/1 is the numeraire).
Thus, the optionRatio+numeraire segment takes up a total of 16 bits since we support up to 4 legs in one position.

Following this, each leg takes up 40 bits and consists of the following details: The first bit signals whether the position is long or short. If long, liquidity is removed from Uniswap. The next bit signals the `tokenType` that is moved when deployed and therefore we are signaling whether it's a call or a put. Following this, we specify which potential risk partner this leg has (this would be another leg in the position). Then follows the strike tick for 24 bits stored as $(tickUpper + tickLower)/2$ of the Uniswap V3 liquidity that reprents the position. The width is stored next for 12 bits defined as $(tickUpper - tickLower) / 2$.

As mentioned, up to four legs can be part of a position. A leg *index* specifies which of the four legs are meant and takes values in {0,1,2,3}. The leg takes values in {1,2,3,4}.
So leg $n$ has leg index $n-1$ in our nomenclature.

## Diagram of the tokenId

So, in summary the 256 bits of the uint256 is a fingerprint of the option position. A unique number representing the ID of the option position and it is broken down into the elements:

(Insert figure)

## Technical Details

The following table gives a thorough technical overview of the tokenId composition - use the diagram above as a visual reference:

|What is stored|Size in bits|Relative offset into ID from LSB|Description|
|---|---|---|---|
|**Uni V3 Pool ID**|80|0|The first 80 bits of the Uni V3 pool address.|
|**optionRatio Leg 1**|3|80|The optionRatio is how many times the user's ERC1155 balance is moved over in tokens|
|**Numeraire Leg 1**|1|83|Specify which token is the numeraire: 0/1 if token0/1 is.|
|**optionRatio Leg 2**|3|84|The optionRatio is how many times the user's ERC1155 balance is moved over in tokens|
|**Numeraire Leg 2**|1|87|Specify which token is the numeraire: 0/1 if token0/1 is.|
|**optionRatio Leg 3**|3|88|The optionRatio is how many times the user's ERC1155 balance is moved over in tokens|
|**Numeraire Leg 3**|1|91|Specify which token is the numeraire: 0/1 if token0/1 is.|
|**optionRatio Leg 4**|3|92|The optionRatio is how many times the user's ERC1155 balance is moved over in tokens|
|**Numeraire Leg 4**|1|95|Specify which token is the numeraire: 0/1 if token0/1 is.|
|**Leg 1 $(leg\_index=0)$**||||
|** \\- isLong**|1|96|The first leg's first bit telling us whether this leg is long (1) or short (0).|
|** \\- tokenType**|1|97|The first leg's second bit telling us whether the token type being moved is token0 (0) or token1 (1).|
|** \\- riskPartner**|2|98|The first leg's risk partner (another leg in this position).|
|** \\- strike**|24|100|The first leg's strike price represented as the mid point of the tick range spanned in the Uni v3 pool, defined as $(tickUpper + tickLower)/2$.|
|** \\- width**|12|124|The first leg's width of the liquidity deployed in the Uni v3 pool, defined as $(tickUpper - tickLower)/2$.|
|**Leg 2 $(leg\_index=1)$**||||
|** \\- isLong**|1|136|The second leg's first bit telling us whether this leg is long (1) or short (0).|
|** \\- tokenType**|1|137|The second leg's second bit telling us whether the token type being moved is token0 (0) or token1 (1).|
|** \\- riskPartner**|2|138|The second leg's risk partner (another leg in this position).|
|** \\- strike**|24|140|The second leg's strike price represented as the mid point of the tick range spanned in the Uni v3 pool, defined as $(tickUpper + tickLower)/2$.|
|** \\- width**|12|164|The second leg's width of the liquidity deployed in the Uni v3 pool, defined as $(tickUpper - tickLower)/2$.|
|**Leg 3 $(leg\_index=2)$**||||
|** \\- isLong**|1|176|The third leg's first bit telling us whether this leg is long (1) or short (0).|
|** \\- tokenType**|1|177|The third leg's second bit telling us whether the token type being moved is token0 (0) or token1 (1).|
|** \\- riskPartner**|2|178|The third leg's risk partner (another leg in this position).|
|** \\- strike**|24|180|The third leg's strike price represented as the mid point of the tick range spanned in the Uni v3 pool, defined as $(tickUpper + tickLower)/2$.|
|** \\- width**|12|204|The third leg's width of the liquidity deployed in the Uni v3 pool, defined as $(tickUpper - tickLower)/2$.|
|**Leg 4 $(leg\_index=3)$**||||
|** \\- isLong**|1|216|The third leg's first bit telling us whether this leg is long (1) or short (0).|
|** \\- tokenType**|1|217|The third leg's second bit telling us whether the token type being moved is token0 (0) or token1 (1).|
|** \\- riskPartner**|2|218|The third leg's risk partner (another leg in this position).|
|** \\- strike**|24|220|The third leg's strike price represented as the mid point of the tick range spanned in the Uni v3 pool, defined as $(tickUpper + tickLower)/2$.|
|** \\- width**|12|244|The third leg's width of the liquidity deployed in the Uni v3 pool, defined as $(tickUpper - tickLower)/2$.|

We note that the final piece of information starts at bit index 244 and takes up 12 bits thus ending at 256 (non-inclusive; to be sure, the final bit is located at 255 as expected).

We use the tokenId library to store and extract the information from within this bit pattern. In other words, by leveraging bit shifting and other techniques, we can always extract any piece of information from the tokenId that we see fit.
Similarly, we can store into the pattern as well and thus we can both read and write to this.
