---
sidebar_position: 1
---

# Leveraging the Gateway
With a functional gateway in hand, let's write a script to sell [straddles](/research/defi-option-straddle-101) at the current price using the Panoptic Gateway. Straddles are a sell-side strategy where options are sold at the same strike price for both calls and puts, maximizing premium collection when the underlying remains close to the strike. We're going to plug the Hummingbot execution client into the Gateway to sell these around the current tick.

Go [here](https://github.com/panoptic-labs/panoptic_hummingbot/pull/2/files#diff-b82cebb857e26f82f7199f157dd9fdbe9079c15e6d5faf6d8349413c6c4e2dd1) for the completed code.

---
### Step 0: Get Hummingbot strategy boilerplate set up

Hummingbot strategies have two high level concepts to be aware of:

1. The `initialize` method: What should the bot do on startup? For example, you may need to set up allowances and deposit into protocols, or go acquire necessary data for your strategy like fetching pool addresses from a router.
2. The `on_tick` method: What logic should execute on the bot's configured "tick" frequency? (Note that in this context, tick means a unit of time, not a Uniswap tick).

You can set up most strategies with these two methods and the necessary imports. Here's a boilerplate you can use for this tutorial below, which includes:

- those two stubs
- some imports & helpers we'll use later
- our `initialize` method, which does things like fetch the pool addresses we need for this tutorial

```python
import bisect
import numpy as np
import time
import asyncio

from .utility.panoptic_helpers import utils as ph

from hummingbot.client.settings import GatewayConnectionSetting
from hummingbot.core.gateway.gateway_http_client import GatewayHttpClient
from hummingbot.core.utils.async_utils import safe_ensure_future
from hummingbot.strategy.script_strategy_base import Decimal, ScriptStrategyBase


class TradePanoptions(ScriptStrategyBase):
    # trading params and configuration
    connector_chain_network = "panoptic_ethereum_sepolia"
    trading_pair = {"t0-t1"}
    markets = {}
    perturbation_testing = True
    verbosity = 1

    launched = False # Have you launched the strategy?
    initialized = False # Have all the initialization steps completed?
    ready = True # Are all on-chain tasks complete and you're ready to process another one?
    tick_count = 0

    # executed each tick (configure tick size in Hummingbot client before launching strategy)
    def on_tick(self):
        # As written, the tick can now be equivalent to an actual clock, as processes are now controlled by
        # flags and wrapped in safe_ensure_future(...)
        self.log(f"Tick count: {self.tick_count}", 1)
        self.tick_count = self.tick_count + 1

        # initial setup - only execute once
        if not self.launched:
            self.log(f"Launching...", 1)
            self.launched = True
            safe_ensure_future(self.initialize())

        # repeat each tick
        if (self.initialized and self.ready):
            # Tricky because the 'safe_ensure_future' bit immediately returns the contained logic as being complete.
            # It won't wait for the processes inside to finish before allowing tick to tok. Can try to get around
            # this by using flags, but that feels clunky.
            self.ready=False
            safe_ensure_future(self.monitor_and_apply_logic())

    # async task since we are using Gateway
    async def monitor_and_apply_logic(self):
        # TODO: Fill in the interesting logic.
        self.ready=True

    async def initialize(self):
        self.t0_symbol, self.t1_symbol = list(self.trading_pair)[0].split("-")
        self.connector, self.chain, self.network = self.connector_chain_network.split("_")

        # fetch wallet address and print balances
        self.gateway_connections_conf = GatewayConnectionSetting.load()
        if len(self.gateway_connections_conf) < 1:
            self.log("No existing wallet.\n", 0)
            return
        self.wallet = [w for w in self.gateway_connections_conf if w["chain"] == self.chain and w["connector"] == self.connector and w["network"] == self.network]
        self.address = self.wallet[0]['wallet_address']

        self.request_payload = {
            "chain": self.chain,
            "network": self.network,
            "connector": self.connector,
            "address": self.address
        }

        self.log(f"Getting token addresses...", 2)
        self.log(f"POST /options/getTokenAddress [ connector: {self.connector}]", 0)
        self.request_payload["tokenSymbol"]= self.t0_symbol
        self.log(f"Finding token {self.t0_symbol}", 2)
        response = await GatewayHttpClient.get_instance().api_request(
            method="post",
            path_url="options/getTokenAddress",
            params=self.request_payload,
            fail_silently=False
        )

        self.request_payload.update({
            "t0_address": response['tokenAddress'],
            "token0Decimals": response['tokenDecimals']
        })
        self.log(f"t0 address: {self.request_payload['t0_address']}", 2)

        self.request_payload.update({
            "tokenSymbol": self.t1_symbol
        })
        self.log(f"Finding token {self.t1_symbol}", 2)
        response = await GatewayHttpClient.get_instance().api_request(
            method="post",
            path_url="options/getTokenAddress",
            params=self.request_payload,
            fail_silently=False
        )
        self.request_payload.update({
            "t1_address": response['tokenAddress'],
            "token1Decimals": response['tokenDecimals']
        })
        self.log(f"t1 address: {self.request_payload['t1_address']}", 2)

        self.log(f"Getting UniswapV3 token pool address...", 2)
        self.log(f"POST /options/checkUniswapPool [ connector: {self.connector}]", 0)

        self.request_payload.update({
            "fee": 500
        })
        response = await GatewayHttpClient.get_instance().api_request(
            method="post",
            path_url="options/checkUniswapPool",
            params=self.request_payload,
            fail_silently=False
        )
        self.request_payload.update({
            "uniswapV3PoolAddress": response["uniswapV3PoolAddress"]
        })
        self.log(f"Uniswap V3 token pool address: {self.request_payload['uniswapV3PoolAddress']}", 2)

        self.log(f"Getting Panoptic token pool address...", 2)
        self.log(f"POST /options/getPanopticPool [ connector: {self.connector}]", 0)

        self.request_payload.update({
            "univ3pool": self.request_payload['uniswapV3PoolAddress'] # redundant
        })
        response = await GatewayHttpClient.get_instance().api_request(
            method="post",
            path_url="options/getPanopticPool",
            params=self.request_payload,
            fail_silently=False
        )
        self.request_payload.update({
            "panopticPoolAddress": response["panopticPoolAddress"],
            "panopticPool": response["panopticPoolAddress"],
        })
        self.log(f"Panoptic token pool address: {self.request_payload['panopticPoolAddress']}", 1)

        self.log(f"Checking ticks...", 2)
        self.log(f"POST /options/getTickSpacingAndInitializedTicks [ connector: {self.connector} ]", 0)
        response = await GatewayHttpClient.get_instance().api_request(
            method="post",
            path_url="options/getTickSpacingAndInitializedTicks",
            params=self.request_payload,
            fail_silently=False
        )
        self.tickSpacing=response['tickSpacing']
        self.tick_locations=response['ticks']
        self.log(f"Tick spacing: {self.tickSpacing}", 1)
        self.log(f"Ticks: {self.tick_locations[0:10]}...{self.tick_locations[-10:]}", 2)

        self.wallet_address=self.address #redundant

        # TODO: Approve tokens and deposit

        self.initialized=True

    # continuously poll for transaction until confirmed
    async def poll_transaction(self, chain, network, txHash):
        pending: bool = True
        while pending is True:
            self.log(f"POST /network/poll [ txHash: {txHash} ]", 0)
            pollData = await GatewayHttpClient.get_instance().get_transaction_status(
                chain,
                network,
                txHash
            )
            transaction_status = pollData.get("txStatus")
            if transaction_status == 1:
                self.log(f"Trade with transaction hash {txHash} has been executed successfully.", 1)
                pending = False
            elif transaction_status in [-1, 0, 2]:
                self.log(f"Trade is pending confirmation, Transaction hash: {txHash}", 1)
                await asyncio.sleep(2)
            else:
                self.log(f"Unknown txStatus: {transaction_status}", 1)
                self.log(f"{pollData}", 2)
                pending = False

    def log(self, message, triviality):
        if (triviality <= self.verbosity):
            self.logger().info(message)
```

Note that we indeed overrode the built-in `tick` counting of Hummingbot in favour of our own. There's likely a cleaner way to configure Hummingbot's ticks, but we ran into enough bugs with it that we chose to run with this strategy for now.

---
### Step 1: Define Strategy Configuration

We first need to add some configuration values into our script. We'll conceive of our ideal positions to maintain with a few parameters:

- `tick_to_maintain`: What ticks relative to the current tick do we want to be selling on?
- `max_utilisation`: What percentage of our position should be bought up at any given moment?
- `min_notional_value_to_sell_USD`: What minimum USD value of options should we be selling at this tick?
- `timescale`: What timescale should this position be?

For example, we could save a target as the following dict:

```python
targets = [
    {"tick_to_maintain": 0, "max_utilisation": 0.5, "min_notional_value_to_sell_USD": 1000, "timescale": "1M"}
]
```

---
### Step 2: Querying about our open positions and the pool state around them
On each tick, we'll need to check if we're meeting our `targets`. We'll add this logic into `monitor_and_apply_logic`, which `on_tick` calls.

First, we'll need to use the `queryPositions` endpoint to fetch our current positions:

```python
response = await GatewayHttpClient.get_instance().api_request(
    method="post",
    path_url="options/queryPositions",
    params=self.request_payload,
    fail_silently=False
)
self.open_positions = response['openPositionIdList']
self.log(f"Open position list: {self.open_positions}", 2)
```

Then, we'll loop through our targets, and see if any of the open positions are relevant to the target (in the sense that they match the `target`'s `strike` and `timescale`). Once we have the relevant positions, we can analyse our state.

```python
for target in self.targets:
    self.ontarget_positions = []
    for position in self.open_positions:
        self.request_payload["tokenId"] = position
        position_data = await GatewayHttpClient.get_instance().api_request(
            method="post",
            path_url="options/unwrapTokenId",
            params=self.request_payload,
            fail_silently=False
        )
        # Check if the position meets the target tick and width
        for leg in position_data['legInfo']:
            strike = leg['strike']
            width = leg['width']
            target_strike = ph.get_valid_tick(
                int(np.floor(self.tick_location - target['tick_to_maintain'])),
                self.tickSpacing,
                self.tickSpacing * ph.timescale_to_width(target['timescale'], self.tickSpacing)
            )
            if strike == target_strike and width == ph.timescale_to_width(target['timescale'], self.tickSpacing):
                # TODO: It's relevant! What next?
```

Next, inside that `if`, we'll check if the position is a sold-call or a sold-put - and if it is, we'll note that this accumulate the total value we're selling at this strike. We'll also accumulate a simple list of on-target positions so we can use that list for contract calls later.

```python
# TODO: check if leg is a sold call or a sold put
# TODO: if it is:
# - get the USD notional value of what is being sold:
#     - strike * positionSize * USD price of the asset
# - increment either volume_being_sold_at_target['call'] or volume_being_sold_at_target['put'] correspondingly
# Then, append this position onto ontarget_positions:
self.ontarget_positions.append(position)
```

Finally, after iterating through `self.open_positions`, we'll do a simple call to get the USD volume bought at our `target`'s strike & timescale, to calculate utilisation later:

```python
# TODO: Next, query the subgraph for positions with any legs purchased against this tick/width
# - if found, increment usd_volume_bought_at_target appropriately based the notional value of each long leg of each position
```

---
### Step 3: Analysing our positions compared to our targets

With the relevant data in hand, our next step in handling this `target` is to compare the value being sold and bought with our target volumes and utilisations. There's two higher-level cases to think through:

1. Is the volume of puts and calls we're selling equal? It will be if we're running this strategy out of the box, but maybe you're doing a little trading on the side or something.
2. Else, we have to handle the puts' and calls' comparisons to the target separately.

Given that, we have a three branch if-else to implement:

```python
# The volumes are equal: Therefore, just check if the calls being sold hit your minimum value, or
# if **either** your calls or your puts are exceeding the max utilisation
if (usd_volume_being_sold_at_target['call'] == usd_volume_being_sold_at_target['put']):
    if (
        usd_volume_being_sold_at_target['call'] < target['min_notional_value_to_sell_USD'] ||
        (
            usd_volume_bought_at_target['call'] / usd_volume_being_sold_at_target['call'] > target['max_utilisation'] ||
            usd_volume_bought_at_target['put'] / usd_volume_being_sold_at_target['put'] > target['max_utilisation']
        )
    ):
        usd_notional_value_to_sell = max(
            target['min_notional_value_to_sell_USD'],
            usd_volume_bought_at_target['put'] * (1 / target['max_utilisation']),
            usd_volume_bought_at_target['call'] * (1 / target['max_utilisation']),
        )
        # TODO: Do a burn-and-mint to burn ontarget_positions, then sell a straddle with a larger position size
        # (Or, if ontarget_positions == [], just mint the straddle)
        # How large? Well, enough to meet the minimum (and maybe a little more:)
        # usd_notional_value_to_sell / (strike * USD price of the asset)
        # TODO: I might need to modify burnAndMint to accept > 1 position to do this...
        # TODO: in the future, some day, we should let people sell a strangles here instead of straddles in a
        # config above
        # TODO: then:
        # - add new position to open_positions & ontarget_positions
        # - remove burnt positions from open_positions & ontarget_positions
else if (
    usd_volume_being_sold_at_target['call'] < target['min_notional_value_to_sell_USD'] ||
    usd_volume_bought_at_target['call'] / usd_volume_being_sold_at_target['call'] > target['max_utilisation']
):
    usd_notional_value_to_sell = max(
        target['min_notional_value_to_sell_USD'],
        usd_volume_bought_at_target['call'] * (1 / target['max_utilisation']),
    )
    # TODO: Filter ontarget_positions to just single-leg sold calls
    # TODO: Then, burn-and-mint to burn the old calls and sell a new call at size:
    # usd_notional_value_to_sell / (strike * USD price of the asset)
    # TODO: then:
    # - add new position to open_positions & ontarget_positions
    # - remove burnt positions from open_positions & ontarget_positions
else if (
    usd_volume_being_sold_at_target['put'] < target['min_notional_value_to_sell_USD'] ||
    usd_volume_bought_at_target['put'] / usd_volume_being_sold_at_target['put'] > target['max_utilisation']
):
    # TODO: The same as the `call` case, but for puts
```

---
### Step 4: Burning and reopening positions to accomplish our trading strategy

Let's fill in the TODOs of those burn-and-remints, and then be sure to keep the `self.open_positions` up to date:

```python
# TODO: Do a burn-and-mint to burn ontarget_positions, then sell a straddle with a larger position size
# (Or, if ontarget_positions == [], just mint the straddle)
# How large? Well, enough to meet the minimum (and maybe a little more:)
# usd_notional_value_to_sell / (strike * USD price of the asset)
# TODO: I might need to modify burnAndMint to accept > 1 position to do this...
# TODO: in the future, some day, we should let people sell a strangles here instead of straddles in a
# config above
# TODO: then:
# - add new position to open_positions & ontarget_positions
# - remove burnt positions from open_positions & ontarget_positions
```

Finally, we also might have other positions found in self.open_positions that are not helping us hit our targets. We want to cull these to ensure we stay under Panoptic's [25-position limit](/docs/contracts/parameters#max_open_legs-ethereum-mainnet). Here's how:

```python
if !maintain_offtarget_positions:
    offtarget_positions = [position for position in self.open_positions if position not in ontarget_positions]
    # TODO: we need an endpoint to call burnOptions(tokenId[]); for now, iteratively calling burnOption(tokenId)
    for offtarget_position in offtarget_positions:
        updated_open_positions = [position for position in self.open_positions if position != offtarget_position]

        request_payload = {
            "chain": chain,
            "network": network,
            "connector": connector,
            "address": address,
            "burnTokenId": offtarget_position,
            "newPositionIdList": updated_open_positions,
            "tickLimitLow": self.tickLimitLow,
            "tickLimitHigh": self.tickLimitHigh
        }

        burn_response = await GatewayHttpClient.get_instance().api_request(
            method="post",
            path_url="options/burn",
            params=request_payload,
            fail_silently=False
        )

        await self.poll_transaction(chain, network, burn_response['txHash'])

        # TODO: check tx success
        # if it succeeded, update open_positions:
        self.open_positions = updated_open_positions
```

### Step 5:

And with that, you should be done! You can run this strategy by spinning up your Hummingbot Gateway:

```bash
cd options_gateway
yarn start --passphrase=YourPassphrase
```

And then spin up Hummingbot:

```bash
cd panoptic_hummingbot
conda activate hummingbot
./start
```

Then, from the Hummingbot Shell, connect to the Gateway and run the script:

```bash
gateway connect panoptic
start --script panoptic_marketmaking_example.py
```

And you should see your script in action from the Logs pane! Happy market making!

TODO: Insert screenshot of successful running
