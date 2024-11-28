---
sidebar_position: 0
---

# Introduction and Setup
Panoptic is a protocol that facilitates the trading of [Panoptions](/docs/terms/panoption), which are perpetual options instruments with fixed gamma between two prices that operate on a [streaming premium model](/docs/product/streamia). We have created an [Options Gateway API](https://github.com/panoptic-labs/options_gateway) that facilitates reading information about these markets, as well as managing positions in them. You can use this API to build market making bots, trading bots, liquidation bots, and more.

We built our API as a fork of the [Hummingbot Gateway](https://github.com/hummingbot/gateway). It can be used in tandem with [Hummingbot](https://github.com/hummingbot/hummingbot) or with [our fork of Hummingbot](https://github.com/panoptic-labs/panoptic_hummingbot) that includes example Panoptic strategies. The API also functions [as a generic transaction-builder and chain-reader, decoupled from Hummingbot-specific functionality or custody setup](TODO: link to "As generic API").

---
## Overview
We have added an `/options` namespace to the Hummingbot Gateway, and have included a number of ways to interact with Panoptic within that namespace:

- You can call `mint` and `burn` with arbitrary token IDs to construct any Panoption possible.
- You can make arbitrary calls to the Panoptic subgraph, as well as convenience methods for getting your existing TokenIDs / positions.
- You can use analytical methods such as `delta` and `gamma` to power a strategy, with more to come.

It also comes with Sepolia support out of the box, which is not found in upstream Hummingbot implementations.

[Our Hummingbot fork](https://github.com/panoptic-labs/panoptic_hummingbot) includes example scripts showing how you could use this Gateway to run automated Panoptic trading strategies, such as market making.

## Using the Gateway With Hummingbot
### Setting up
To run a Hummingbot script that interacts with Panoptic, you will need to set up [our Hummingbot fork](https://github.com/panoptic-labs/panoptic_hummingbot) and [the Gateway fork](https://github.com/panoptic-labs/options_gateway).

#### Step 1: Setting up the hummingbot fork:

1. First, clone the Hummingbot Fork repository down, and enter the directory we'll be working out of:
    1. `git clone https://github.com/panoptic-labs/panoptic_hummingbot.git`
    2. `cd panoptic_hummingbot`
2. Then, get the Hummingbot Anaconda environment ready:
    1. Ensure you have [Anaconda installed](https://www.anaconda.com/download)
    2. Then, simply use the installation shellscript: `./install`
    3. And finally, activate the newly installed environment: `conda activate hummingbot`
3. Next, you should be able to use the compilation shellscript to get your executables ready to run Hummingbot:
    1. `./compile`
4. And finally, you can pull up the terminal UI with the start shellscript:
    1. `./start`
5. The Hummingbot UI should now present itself, and you will be asked to set a passphrase.
6. The Hummingbot UI is split into two parts - the shell, on the left, where you can run commands such as starting strategy scripts, and the logs on the right.

TODO: Insert your screenshot

Your first shell command will be to generate some certificates to secure the data you supply your Hummingbot, such as the private key to a trading account.

    1. Generate the certs by entering into the shell: `gateway generate-certs`
    2. You’ll be prompted to set a passphrase (And note that this is a different value than the password for your Hummingbot UI).
    3. Once you successfully generate the certificates, Hummingbot will list the directory those certificates are stored in.
    4. Copy the directory path it generates these certificates to - you'll need it for setting up the Gateway.
    5. Typically, this certificate destination is `~/panoptic_hummingbot/certs` - in other words, a certs sub-folder in the same folder as your hummingbot repo.

You now have a Hummingbot set up and ready for your usage. Let's now give it a Gateway to interact with the blockchain through:

#### Step 2: Setting up the gateway fork:

1. Similarly, we will clone down the Gateway fork  and enter the directory to work out of:
    1. `git clone git@github.com:panoptic-labs/options_gateway.git`
    2. `cd options_gateway`
2. We will then install our dependencies:
    1. `yarn`
    2. Ensure you’re using node 18.0.0 or higher - you can use [nvm](https://github.com/nvm-sh/nvm) to manage different node versions if needed.
3. Then, we compile the project and get a runnable Gateway executable:
    1. `yarn build`
4. Next, we run the built-in setup script:
    1. First, we give permissions to the script: `chmod a+x gateway-setup.sh`
    2. Then we run it: `./gateway-setup.sh`
    3. This script will prompt you to copy over the certificates from your Hummingbot (step 6.5 above). Enter the path (and possibly passphrase) for those certs.

Your Gateway is now ready as well. Let's get these tools running:

### Running

1. Running the Gateway is quite easy - simply `yarn start` with the passphrase for your certificates from 6.5: `yarn start --passphrase=<passphrase>`
2. Similarly, you can run your Hummingbot with the `./start` command we mentioned above. Once you do this, if your Gateway is successfully running, you should see GATEWAY: ONLINE in the top of your log pane.
3. In the Hummingbot shell, you can explicitly connect to the Panoptic functionality in the Gateway by running `gateway connect panoptic`. This will prompt you to supply an RPC URL and a private key for a trading wallet.
    1. You can confirm that your connection was successful by running `gateway balance`.
4. To see the results of your Panoptic trading, you will likely want to track a number of tokens. You can add expand the tokens that `gateway balance` reports on via the `gateway connector-tokens panoptic_ethereum_sepolia` command (substituting `sepolia` for your target chain).
    1. Hummingbot will accept some well-known tokens out of the box by their ticker alone - so you can do things such as `gateway connector-tokens panoptic_ethereum_sepolia WETH`.
    2. And you can expand this list by modifying `options_gateway/src/templates/lists/erc20_tokens_sepolia.json` for your appropriate chain.

Your Hummingbot can now interact with Panoptic. Let's write a script!

### Scripting

1. Your strategies will live in the `scripts` subfolder in the `panoptic_hummingbot` folder. Let's start an example script to operate on the Sepolia test market, T1/T0. Create a file called `panoptic_testing_example.py`.
2. For any strategies to trade successfully, you will have to approve the tokens from your trading wallet to the Panoptic and Uniswap contracts. The first thing your strategy should do is check if it has a sufficient allowance with the relevant Panoptic contracts:
    1. TODO list python command to call the gateway to query `.allowance`
    2. And if your allowance is insufficient, you should `.approve` the relevant Panoptic contracts: TODO list python command to call the gateway to `.approve`, and which specific Panoptic contracts you need to `.approve` / how to get their addresses.
3. Your strategy will also need to deposit collateral before proceeding to trade.
    1. TODO list command to query collateralTracker.balanceOf
    2. At the start of the strategy, we'll need to `.deposit`: TODO list command to call `.deposit`
4. After these initial approvals and deposits, we are ready to perform some regularly scheduled actions in an `on_tick` method
    1. This method gets called every `tick` of your Hummingbot config. By default, this is 1 second. TODO: List how to alter it to 12 seconds to match Ethereum block time.
    2. Depending on your trading philosophy, you may have different requirements on how much collateral you should have deposited at any one time. In general, you can use your account's current [buying power usage](TODO: Link to docs on what buying power usage is) as a threshold your strategy can manage. You can set some percentage that your buying power should be kept beneath, and `.deposit` as need be to top up on each tick. It'll work the same as our initial deposit in the setup: TODO list the command to deposit
4. With these basic building blocks, your strategy is ready to trade. You can now add more functionality into your `on_tick` to make trades - you can use the guide on [automatically selling straddles](/docs/apis/options-gateway/leveraging-the-gateway)  as a starting point.

## Using the Gateway As A Generic API
### Setting up

You can use the Options Gateway as a generic transaction-building API without being tied into the full Hummingbot setup. This may be useful depending on your wallet management - using the Gateway alone will enable you to trade from multisigs or smart wallets, if you like, and still avoid the pain of constructing complex smart contract call sequences on your own.

First, we'll need to set up the Gateway:

1. Clone down the Gateway fork  and enter the directory to work out of:
    1. `git clone git@github.com:panoptic-labs/options_gateway.git`
    2. `cd options_gateway`
2. Install the dependencies:
    1. `yarn`
    2. Ensure you’re using node 18.0.0 or higher - you can use [nvm](https://github.com/nvm-sh/nvm) to manage different node versions if needed.
3. Compile the project and get a runnable Gateway executable:
    1. `yarn build`
4. Now, we'll need to generate our certificates. In the full Hummingbot setup, you can do this from their terminal UI, but we'll do this using built-in Unix tools:
    1. Make a directory: `mkdir certificates`
    2. Then, generate the certificates using a self-signed CA:
        1. Create the CA:
            1. `openssl genrsa -out ./certificates/ca_key.pem 2048`
            2. `openssl req -new -x509 -key ./certificates/ca_key.pem -out ./certificates/ca_cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=GatewayCA/CN=localhost"`
        2. Then create a server key and certificate signing request (CSR)
            1. `openssl genrsa -out ./certificates/server_key.pem 2048`
            2. `openssl req -new -key ./certificates/server_key.pem -out ./certificates/server.csr -subj "/C=US/ST=State/L=City/O=Gateway/CN=localhost"`
        3. Then, sign the server certificate with our CA: `openssl x509 -req -days 365 -in ./certificates/server.csr -CA ./certificates/ca_cert.pem -CAkey ./certificates/ca_key.pem -CAcreateserial -out ./certificates/server_cert.pem`
            1. Note that this expires after a year - you can increase this `-days` flag arbitrarily highly
5. Then, we'll run the gateway setup script, to initialise our Gateway config and copy over those certificates:
    1. Run the script: `./gateway-setup.sh`
    2. When prompted to copy over certificates, select Y and provide the path for the certificates you just created: `/path/to/your/options_gateway/certificates`
    3. And select Y to copy over the config.
6. And now, you should be able to run the gateway! There is a mandatory `passphrase` argument, but we won't be using it, so you can just run `yarn start --passphrase=anything`
7. Optionally, if you don't want to set up mutual TLS authentication, and allow your integration to communicate with the Gateway via `http` instead of `https`, you can change `conf/server.yml` `unsafeDevModeWithHTTP` flag to `true`. You'll get a security warning when you `yarn start` the Gateway, but if you have no sensitive information being passed between these two systems, it may make sense.
    1. If you skip this step, you'll need to use the CA you set up in step 4 above to generate some client-side keys, and pass those as headers from your integration. Request libraries like `axios` and `fetch` will provide helpers for using these SSL keys.
8. The Gateway is now running. We can send arbitrary requests to `localhost:15888` to generate transactions.

Since we're only using it as a transaction generator, we'll be heavily leveraging the [doNotBroadcast parameter](TODO: LINK SECTION TALKING ABOUT THIS PARAM). When this parameter is `true`, the Panoptic endpoints will avoid trying to sign and broadcast transactions with the supplied `wallet`, but still allow you to use the unsignedTransactionPayload to sign and broadcast the transactions in whatever manner you like.

To confirm functionality, let's generate an unsigned transaction to deposit some TokenRed tokens into the Sepolia test TokenRed<>TokenBlue market.

First, ensure you have the Panoptic contracts approved to spend your TokenRed: TODO

Then, you should be able to send a cURL request to generate this unsigned transaction payload for a deposit:

```
curl --header "Content-Type: application/json" \
     --request POST \
     --data '{
       "chain": "ethereum",
       "network": "sepolia",
       "connector": "panoptic",
       "wallet": "0xYourWallet",
       "collateralTracker": "0x203bc3e3A8031d4d71e79f95A51C89284F813c22",
       "assets": "100000000000000000000",
       "address": "0xYourWallet"
     }' \
     http://localhost:15888/panoptic/deposit
 ```

 For testing, you can use Steve's wallet, 0x275e8f09f090cf9b8e77008643e33d477fbb05e6. That should get you a real, useable unsigned transaction payload that his wallet could sign, like so:

 ```
 (base) gateway_client_example:$ curl --header "Content-Type: application/json"      --request POST      --data '{
       "chain": "ethereum",
       "network": "sepolia",
       "connector": "panoptic",
       "wallet": "0x275e8f09f090cf9b8e77008643e33d477fbb05e6",
       "collateralTracker": "0x203bc3e3A8031d4d71e79f95A51C89284F813c22",
       "assets": "100000000000000000000",
       "address": "0x275e8f09f090cf9b8e77008643e33d477fbb05e6","doNotBroadcast": true
     }'      http://localhost:15888/options/deposit
{"tx":null,"network":"sepolia","timestamp":1732764503484,"unsignedTransaction":{"data":"0x6e553f650000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000275e8f09f090cf9b8e77008643e33d477fbb05e6","to":"0x203bc3e3A8031d4d71e79f95A51C89284F813c22","gasLimit":{"type":"BigNumber","hex":"0x01a97b"},"from":"0x275e8f09f090cf9b8e77008643e33d477fbb05e6"}}
```

### Integrating
// TODO: paste rust examples etc of sign-then-broadcast 2 liner from Slack

## Contributing to the Gateway
TODO
