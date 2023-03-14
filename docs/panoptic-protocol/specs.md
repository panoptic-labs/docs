---
sidebar_position: 6
---

# Panoptic Specs

### User Balances
Funds are deposited by users in the Panoptic Pool. These funds will be used as collateral for writing/buying options.

The balance of each "user", where "user" could also be the Panoptic Pool, is:


```python
balanceOf = {}

def balanceOf(user='0x123'):
    return balanceOf[user]

```

### Assets inside UniswapV3Pool

Funds are moved from the PanopticPool to the UniswapPool to create a short option payoff. 

Funds in the Uniswap pool can be "shorted" and moved back to the PanopticPool to create a long option payoff.

The amount of funds moves is called the `notionalValue`, and it is defined (for puts) as 

`notionalValue = strike * positionSize`

where `positionSize` is similar to the number of contracts for a regular option


```python
inAMM = 0
def _inAMM():
    return inAMM

# Will only consider put options with token0
def mintPutOption(strike, positionSize, optionType):
    
    #[...]
    
    # update inAMM
    notionalValue = strike * positionSize
    if optionType == 'short':
        inAMM += notionalValue
        
    elif optionType == 'long':
        inAMM -= notionalValue
        
  
        
        
```

### Locked Assets

Liquidity that has been moved to Uniswap will collect fees from the trading activity. These fees are the option premium that will be distributed to the option sellers.

When a user sells an option at a specific strike, liquidity is deployed to the Uniswap pool at a specific tick range and the smart contract starts recording the fees accumulated.

If another user sells that *same* option at the same strike, the liquidity is also moved to the Uniswap pool. In addition, all fees accumulated at that position will be collected and moved to a "secure" location called `lockedFees` inside the PanopticPool. 

Collecting fees every time a position is touched reduces the risks of the protocol becoming insolvent.


```python
lockedFees = 0

def _lockedFees():
    return lockedFees

# Will only consider put options with token0
def mintPutOption(strike, positionSize, optionType):
    
    #[...]
    
    # lock collected fees
    fees = collect(strike) # collect all fees at that strike
    lockedFees += _fees
    
    #[...]
        
```

### Pool Utilization
The instantaneous pool utilization is the fraction of all funds deposited that have been moved to the Uniswap pool. Several quantities depend on the pool utilization: the `totalAssets()`, `_inAMM()`, and `_lockedFees()`.

The amount of `totalAssets()` and the `_poolUtilization()` are computed as follow:


```python
def totalAssets():
    return balanceOf['panopticPool'] - _lockedFees() + _inAMM()
    
def _poolUtilization():
    if totalAssets() == 0:
        return 0
    return _inAMM() / totalAssets()
```

### Commission fee

The commission fee is paid by the option traders whenever they sell or buy an option. The commission fee is proportional to the notional value of the options and depends on the poolUtilization.

`Commission fee = _commissionRate() * notionalValue`

##### Parameters that can change:
- `max_commission`
- `min_commission`


```python
def _commissionRate():
    # monotonically decreasing commission
    #   (x0,y0)=(commissionStartUtilization,commissionFeeMax) (starts high at low utilization) to
    #   (x1,y1)=(targetPoolUtilization,commission_fee_min)
    #
    #    COMMISSION
    #    _RATE         ^
    #                  |  max commission = 60bps
    #         60bps  _ |__
    #                  | .¯-_
    #                  | .   ¯-_   min commission = 20bps
    #         20bps  _ | .      ¯-_____________
    #                  | .       .         .
    #                  +-+-------+---------+--->  POOL_
    #                   10%     50%      100%      UTILIZATION
    #                   Umin    Umid      
        
    utilization = _poolUtilization() 
    if utilization < Umin:
        return max_commission
    elif utilization > Umid:
        return min_commission
    else:
        return max_commission - (max_commission - min_commission)*(utilization - Umin) / (Umid - Umin)  
            

        
def mintPutOption(strike, positionSize, optionType):
    
    #do stuff
    
    # lock collected fees
    fees = collect(strike) # collect all fees at that strike
    
    lockedFees += _fees
    
    # update inAMM
    notionalValue = strike * positionSize
    if optionType == 'short':
        #do stuff
        inAMM += notionalValue
        
    elif optionType == 'long':
        #do stuff
        inAMM += notionalValue        
        
    # Pay commission. 
    # msg.sender is the address of the user that sold that option    
    balanceOf[msg.sender] -= notionalValue*_commissionRate()
    balanceOf[PanopticPool] += notionalValue*_commissionRate()    
```

### Buying Power Requirements (long options)

The Buying power requirement is the amount of collateral needed to be deposited in order to sell/buy an option. 

The buying power requirement for LONG options ensures that enough funds are available to cover any potential premium to be paid for purchasing that option. It is based on the pool utilization that was determined at the time a position was minted and this initial buying power requirement will not change over time (although the buying power requirement will increase as the position accumulates owed premium).

`BUYING_POWER_REQUIREMENT = buyCollateralRatio() * notionalValue`

##### Parameters that can change:
- `base_ratio`
- `min_ratio`
- `Umin`
- `Umid`


```python
def _buyCollateralRatio():    
    # linear from BUY to BUY/2 between 50% and 90%
    # @dev the buy ratio is on a straight line defined between two points (x0,y0) and (x1,y1):
    #   (x0,y0) = (targetPoolUtilization,buyCollateralRatio) and
    #   (x1,y1) = (saturatedPoolUtilization,buyCollateralRatio / 2)
    # note that y1<y0 so the slope is negative:
    # aka the buy ratio starts high and drops to a lower value with increased utilization; the sell ratio does the opposite (slope is positive)
    # the line's formula: y = a * (x - x0) + y0, where a = (y1 - y0) / (x1 - x0)
    # but since a<0, we rewrite as:
    # y = a' * (x0 - x) + y0, where a' = (y0 - y1) / (x1 - x0)
    #
    #  BUY
    #  _COLLATERAL
    #  _RATIO ^
    #         |   base_ratio = 10%
    #   10% - |----------__       min_ratio = 5%
    #   5%  - | . . . . .  ¯¯¯--______
    #         |         .       . .
    #         +---------+-------+-+--->   POOL_
    #                  50%    90% 100%      UTILIZATION
    #                  Umin  Umid
    utilization = _poolUtilization() 
    if utilization < Umin:
        return base_ratio
    elif utilization > Umid:
        return min_ratio
    else:
        return base_ratio - (base_ratio - min_ratio)*(utilization - Umin) / (Umid - Umin)     
    
    
buyingPowerRequirement = {}   

def deposit(amount):
    balanceOf[msg.sender] -= amount    
    balanceOf[panopticPool] += amount
    
    buyingPowerRequirement[msg.sender] += amount
    
    
def mintPutOption(strike, positionSize, optionType):
    
    #do stuff
    
    # lock collected fees
    fees = collect(strike) # collect all fees at that strike
    
    lockedFees += _fees
    
    # update inAMM
    notionalValue = strike * positionSize
    if optionType == 'short':
        inAMM += notionalValue
        
    elif optionType == 'long':
        buyingPowerRequirement[msg.sender] -= notionalValue * _buyCollateralRatio()
        inAMM += notionalValue        
        
    # Pay commission. 
    # msg.sender is the address of the user that sold that option    
    balanceOf[msg.sender] -= notionalValue*_commissionRate()
    balanceOf[PanopticPool] += notionalValue*_commissionRate()    
```

### INITIAL Buying Power Requirements (short options)

The Buying power requirement is the amount of collateral needed to be deposited in order to sell/buy an option. 

The buying power requirement for SHORT options ensures that enough funds are available to cover any potential intrinsic value that results from positions becoming in-the-money. 

It is based on the pool utilization that was determined at the time a position was minted and the buying power requirement will not change over time.

`BUYING_POWER_REQUIREMENT = sellCollateralRatio() * notionalValue`

##### Parameters that can change:
- `base_ratio`
- `Umin`
- `Umid`


```python
def _sellCollateralRatio(utilization):    
    # @dev the sell ratio is on a straight line defined between two points (x0,y0) and (x1,y1):
    #   (x0,y0) = (targetPoolUtilization,min_sell_ratio) and
    #   (x1,y1) = (saturatedPoolUtilization,max_sell_ratio)
    # the line's formula: y = a * (x - x0) + y0, where a = (y1 - y0) / (x1 - x0)
    #
    #  SELL
    #    _COLLATERAL
    #    _RATIO        ^
    #                  |                  max ratio = 100%
    #           100% - |                _------
    #                  |             _-¯ . .
    #                  |          _-¯    . .
    #            20% - |---------¯   base_ratio = 20%
    #                  |         .       . .
    #                  +---------+-------+-+--->   POOL_
    #                           50%    90% 100%     UTILIZATION
    #                          Umin   Umid
    
    if utilization < Umin:
        return base_ratio
    elif utilization > Umid:
        return max_ratio
    else:
        return base_ratio + (max_ratio - base_ratio)*(Umid - utilization) / (Umid - Umin)     
    
    
buyingPowerRequirement = {}   

def deposit(amount):
    balanceOf[msg.sender] -= amount    
    balanceOf[panopticPool] += amount
    
    buyingPowerRequirement[msg.sender] += amount
    
    
def mintPutOption(strike, positionSize, optionType):
    
    #do stuff
    
    # lock collected fees
    fees = collect(strike) # collect all fees at that strike
    
    lockedFees += _fees
    
    # update inAMM
    notionalValue = strike * positionSize
    if optionType == 'short':
        buyingPowerRequirement[msg.sender] -= notionalValue * _buyCollateralRatio(_poolUtilization())
        inAMM += notionalValue
        
    elif optionType == 'long':
        buyingPowerRequirement[msg.sender] -= notionalValue * _sellCollateralRatio(_poolUtilization())
        inAMM += notionalValue        
        
    # Pay commission. 
    # msg.sender is the address of the user that sold that option    
    balanceOf[msg.sender] -= notionalValue*_commissionRate()
    balanceOf[PanopticPool] += notionalValue*_commissionRate()    
```

### MAINTENANCE Buying Power Requirements (short options)

The buying power requirement for SHORT options is initially be set by the pool utilization, but the requirement will change as the price changes and the position becomes in-the-money.

The expression for the BUYING_POWER_REQUIREMENT

`SELL_POWER_REQUIREMENT = sellCollateralRatio(poolUtilizationAtMint) * notionalValue + inTheMoneyRequirement(price)`

##### Parameters that can change:
- none


```python
def checkBuyingPowerRequirement(price, strike, positionSize, initialUtilization):    
    #
    #              Short put BPR = 100% - (100% - SCR)*(price/strike)
    #  
    #    BUYING
    #    _POWER
    #    _REQUIREMENT  ^                
    #           100% - |   <- ITM   .     ATM     . OTM ->
    #                  |            .      .      .
    #                  |      -     .      .      .
    #                  |       ¯_   .      .      .
    #                  |         -  .      .      .
    #                  |          ¯_.      .      .     
    #                  |            -¯-_   .      .   
    #                  |            .¯_ ¯-_.      .
    #                  |            .  -   ¯-_    . 
    #                  |            .   ¯_ .  ¯-_ .    
    #            SCR - |            .     -._____¯-_____
    #                  |            .      .      .
    #                  +------------+------+------+-->   current
    #                  0              Pa strike  Pb       price
    #   
    
    notionalValue = strike * positionSize
     
    sellRatio = _sellCollateralRatio(initialUtilization)
    
    if (price > Pb): ## Position is OTM
        collateralRequirement = notionalValue * sellRatio
    elif (price < Pa):  ## Position is ITM and Out-of-range (price is lower that lower bound)
        collateralRequirement = notionalValue * (sellRatio + (1-sellRatio) * (1 - price/strike))
    else: ## Position is ARM and in-range
        collateralRequirement = notionalValue * (sellRatio + (1-sellRatio) * (1 - Pa/strike)*(Pb - price)/(Pb - Pa))
  
    
```
