---
sidebar_position: 8
---

# Left-Right Encoding Library

We efficiently represent data in a packed format. Most integers in Panoptic can be represented by 128bits or less.
In those cases, we leverage our LeftRight library to pack data into a full 256 bit word.

We use two structs (one for unsigned and one for signed integers) to pack the data:

```solidity
struct LeftRightUint256 {
    uint128 left;
    uint128 right;
}

struct LeftRightInt256 {
    int128 left;
    int128 right;
}
```

From this, helper functions can read and write from and to the right and left slots. We use these helper functions to assist with type and error checkings.

For example, we can write an int128 to a LeftRightUint256.

## Right Slot

To read and write to the right slot of the structs, you can use:

```solidity
> myStruct = LeftRightUint256; # create a new struct
> uint128 val = 123;
> myStruct = myStruct.toRight(val); # write to right slot
> myStruct.rightSlot(); # read from right slot
123
```

And here we can store an int128 seamlessly in our "uint256":

```solidity
> myStruct = LeftRightUint256; # create a new struct
> int128 val = 321;
> myStruct = myStruct.toRight(val); # write to right slot
> myStruct.rightSlot(); # read from right slot
321
```

## Left Slot

The left slot works the same way as the right slot:

```solidity
> myStruct = LeftRightUint256; # create a new struct
> uint128 val = 123;
> myStruct = myStruct.toLeft(val); # write to right slot
> myStruct.leftSlot(); # read from right slot
123
```

## General Casting Helpers

We also provide general helpers to cast integers with over/underflow protection between their unsigned and signed versions:

```solidity
function toInt128(int256 toBeDowncasted) internal pure returns (int128 downcastedInt)
```

```solidity
function toUint128(uint256 toBeDowncasted) internal pure returns (uint128 downcasted)
```

```solidity
function toInt256(uint256 toBeCasted) internal pure returns (int256)
```
