---
sidebar_position: 0
---

# Introduction and Setup
Panoptic is a protocol that facilitates the trading of [Panoptions](/docs/terms/panoption), which are perpetual options instruments with fixed gamma between two prices that operate on a [streaming premium model](/docs/product/streamia). Panoptic uses Uniswap as an options clearinghouse and operates with the principles that [LP = Options](/blog/uniswap-lp-equals-options). We have created an [Options Gateway API](https://github.com/panoptic-labs/options_gateway) which provides market data, place orders, and access account information. You can use this API to build market making bots, trading bots, liquidation bots, and more.

TODO: Do we seperate "read" apis from "write" apis or are they all just grouped together under Options Gateway?

We built our API as a fork of the [Hummingbot Gateway](https://github.com/hummingbot/gateway). It can be used in tandem with [Hummingbot](https://github.com/hummingbot/hummingbot) or with [our fork of Hummingbot](https://github.com/panoptic-labs/panoptic_hummingbot) that includes example Panoptic strategies. The API also functions as a generic [transaction-builder and chain-reader](TODO: link to "As generic API"), decoupled from Hummingbot-specific functionality or custody setup.

---
## Overview
We have added an `/options` namespace to the Hummingbot Gateway and have included a number of ways to interact with Panoptic within that namespace:

- You can call `mint` or `burn` with arbitrary token IDs to open or close any Panoption.
- You can make arbitrary calls to the Panoptic subgraph, as well as convenience methods to get your existing positions and their corresponding `TokenIDs`.
- You can use analytical methods such as the Greek `delta` and `gamma` to inform a strategy.

The namespace also supports Sepolia, an Ethereum testnet, which is not currently available in upstream Hummingbot implementations.

Our [Hummingbot fork](https://github.com/panoptic-labs/panoptic_hummingbot) includes example scripts showing how you could use this gateway to run automated Panoptic trading strategies such as market making.

## Using the Gateway With Hummingbot
### Set Up
To run a Hummingbot script that interacts with Panoptic, you will need to set up our [Hummingbot fork](https://github.com/panoptic-labs/panoptic_hummingbot) and the [gateway fork](https://github.com/panoptic-labs/options_gateway).

>Note: Hummingbot is [designed](https://hummingbot.org/installation/windows/) for Unix-based environments such as macOS or Linux, so **Windows users must install Windows Subsystem for Linux 2 (WSL 2) and setup and run Hummingbot in WSL 2**.

#### Step 1: Setting up the Hummingbot fork

1. Clone Panoptic's Hummingbot fork repository down and enter the directory you'll be working out of:
    ```bash
    git clone https://github.com/panoptic-labs/panoptic_hummingbot.git
    cd panoptic_hummingbot
    ```
2. Get the Hummingbot Anaconda environment ready:
    - Ensure you have [Anaconda](https://www.anaconda.com/download) installed.
    - Install Panoptic Hummingbot by running its installation shellscript:
      ```bash
      ./install
      ```
      *(The installation process may take a few minutes to complete.)*
    - Activate the newly installed virtual environment (running the prior hummingbot installation script automatically creates a Conda virtual environment named `hummingbot`):
      ```bash
      conda activate hummingbot
      ```
3. Get your executables ready to run Hummingbot:
    - Run Panoptic Hummingbot's compilation shellscript:
      ```bash
      ./compile
      ```
4. Open the terminal UI:
    - Run Panoptic Hummingbot's start shellscript:
      ```bash
      ./start
      ```
5. The Hummingbot UI will appear, and you will be asked to set a passphrase. The Hummingbot UI is split into two parts:
    - Left side: The shell, where you can run commands such as starting strategy scripts.
    - Right side: The logs.

TODO: Insert your screenshot

To ensure the security of the data supplied to your Hummingbot, such as private keys for your trading account, you will first need to generate certificates.

6. Generate Certificates: Run the following command in your terminal:
     ```bash
     gateway generate-certs
     ```
7. Set a Passphrase: You will be prompted to create a passphrase (note: this passphrase is different from the password you created for the Hummingbot UI).
8. Locate the Certificate Directory: Once the certificates are successfully generated, Hummingbot will display the directory where they are stored.
9. Copy the Directory Path: Copy the full directory path for later use. You'll need this path when configuring the Gateway.
10. By default, the certificates are stored in:
     ```
     ~/panoptic_hummingbot/certs
     ```
   - This means the certificates are in the `certs` folder within the same directory as your Hummingbot repository.

With your Hummingbot secured and certificates generated, it's time to set up the gateway to enable blockchain interactions.

#### Step 2: Setting up the gateway fork

1. Clone Panoptic's fork of the Hummingbot Gateway and enter the directory to work out of:
    ```bash
    git clone git@github.com:panoptic-labs/options_gateway.git
    cd options_gateway
    ```
2. Install the dependencies:
    - Run the following command:
      ```bash
      yarn
      ```
    - Ensure you’re using Node.js version 18.0.0 or higher. You can use [nvm](https://github.com/nvm-sh/nvm) to manage different Node.js versions if needed.
3. Compile the project to create a runnable gateway executable:
    ```bash
    yarn build
    ```
4. Run the built-in setup script:
    - Give permissions to the script:
      ```bash
      chmod a+x gateway-setup.sh
      ```
    - Execute the script:
      ```bash
      ./gateway-setup.sh
      ```
    - During this step, you will be prompted to copy over the certificates from your Hummingbot fork setup. Enter the path to your certificates and, if applicable, the passphrase.

Your gateway is now ready. Let's get these tools running!


### Run

1. Run the gateway with the passphrase for your certificates:
      ```bash
      yarn start --passphrase=<passphrase>
      ```
2. Run Hummingbot with the `./start` command (as in step 1.4). 
    - The following message will be displayed at the top of the log panel to indicate the gateway is running successfully:
      ```
      GATEWAY: ONLINE
      ```
3. In the Hummingbot shell, explicitly connect to the Panoptic functionality in the gateway by running:
    ```bash
    gateway connect panoptic
    ```
    - This will prompt you to supply an RPC URL and a private key for your trading wallet.
    - Confirm your connection was successful by running:
      ```bash
      gateway balance
      ```
4. To effectively monitor your trading account balances on Panoptic, you'll want to input which tokens to track:
    - Expand the list of tokens reported by `gateway balance` using the following command:
      ```bash
      gateway connector-tokens panoptic_ethereum_sepolia
      ```
      *(Substitute `sepolia` with your target chain)*
    - Hummingbot accepts some well-known tokens out of the box by their ticker alone. For example:
      ```bash
      gateway connector-tokens panoptic_ethereum_sepolia WETH
      ```
    - You can further expand this list by modifying the token list JSON file for your chain:
      ```text
      options_gateway/src/templates/lists/erc20_tokens_sepolia.json
      ```

Your Hummingbot can now interact with Panoptic. Let's write a script!

### Scripts

1. Let's start an example script to operate on the T1/T0 market on Sepolia testnet. 
   - Your strategies will reside in the `scripts` subfolder of the `panoptic_hummingbot` folder. Create a file called `panoptic_testing_example.py` in the `scripts` subfolder.
2. For any strategies to trade successfully, you will need to approve tokens from your trading wallet to the Panoptic and Uniswap contracts. The first step in your strategy should be to check if you have sufficient allowance with the relevant Panoptic contracts:
    - Query Allowance:
      ```python
      # TODO: List the Python command to call the gateway to query `.allowance`
      ```
    - Approve Tokens:
      ```python
      # TODO: List the Python command to call the gateway to `.approve`
      # TODO: Specify which Panoptic contracts need approval and how to get their addresses
      ```
3. Your strategy will need to deposit collateral before proceeding to trade:
    - Query Collateral Balance:
      ```python
      # TODO: List the command to query `collateralTracker.balanceOf`
      ```
    - Deposit Collateral:
      ```python
      # TODO: List the command to call `.deposit`
      ```
4. After these initial approvals and deposits, you can perform regularly scheduled actions in the `on_tick` method:
    - Define `on_tick`:
      - This method gets called every `tick` of your Hummingbot configuration (default tick is 1 second).
      - Modify Tick Interval:* 
        ```python
        # TODO: List how to alter the tick interval to 12 seconds to match Ethereum block time
        ```
    - Monitor Collateral and Deposit as Needed:
      - Depending on your trading strategy, you may have different requirements for collateral levels. In general, you can use your account's current [buying power usage](TODO: Link to docs on what buying power usage is) as a threshold.  
      - Set a percentage limit for buying power and deposit collateral as needed during each tick:
        ```python
        # TODO: List the command to deposit collateral
        ```
5. With these basic building blocks, your strategy is ready for trading. You can add more functionality to your `on_tick` to perform trades.
    - Use the guide on automated [straddle selling](/docs/apis/options-gateway/leveraging-the-gateway) as a starting point.

## Using the Gateway As A Generic API
### Set Up

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

### Integrate
// TODO: paste rust examples etc of sign-then-broadcast 2 liner from Slack

## Contribute to the Gateway
TODO
