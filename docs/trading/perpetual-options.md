---
sidebar_position: 2
---

# Perpetual options


Perpetual options (AKA *perps*) are a type of financial derivative that allows investors to buy or sell an underlying asset at a specified price, known as the strike price, without an expiration date. This is in contrast to traditional options that have a predetermined expiry date. perpetual options give investors the flexibility to exercise their option whenever they see fit. 

Intuitively, perpetual options are (traditional) options contracts --with a very short expiration date--, that keeps getting rolled over before expiration. 

As of the time of this writing, Perpetual options are not commonly found in TradFi exchanges, as they tend to be highly specialized. When they do trade, which again, is rare, the transaction usually takes place on the OTC market. 


### How do Perpetual Options Work?

Perpetual options work similarly to traditional options, with a few key differences. They are primarily traded on decentralized exchanges (DEXs) in the DeFi ecosystem, leveraging smart contracts to facilitate the transactions.

We can broadly classify Perpetual options in two categories: *Funding-rate-based* and *Streaming Premia-driven*, such as Panoptions. Let's briefly discuss these mechanisms in more detail:


- **Funding-Rate-based**: The funding rate is a key component of some perpetual options. It is a periodic payment exchanged between the buyer and the seller to keep the option alive. If the funding rate is positive, the buyer pays the seller, and if it's negative, the seller pays the buyer. This mechanism ensures that the option remains in balance and prevents the seller from being at a disadvantage due to the lack of an expiration date. This mechanism usually requires a price oracle, which is expensive to compute on chain, and it is succeptible to price manipulation.

- **Streaming-premia-driven**: In this case, the buyer of the option pays 0 upfront to open the position, but instead pays a (usually small) fee on a block-to-block basis to keep their position open. This is the model that Panoptic uses. Contrary to the funding-rate-based, the streaming-premia-driven Perpetuals (AKA Panoptions) do not need a price oracle. 


### Comparing Perpetual Options to Traditional Options

There are a few key differences between perpetuals and traditional options. We outline some of them bellow. 

- **Expiration**: The most notable difference between perpetual options and traditional options is the lack of an expiration date. Traditional options have a fixed expiry date, after which the option becomes worthless. Perpetual options, on the other hand, can be exercised at any point, giving investors more flexibility.

- **Decentralization**: Perpetual options are traded on decentralized exchanges, offering increased security and transparency compared to traditional options, which are primarily traded on centralized exchanges.

- **Accessibility**: DeFi-based perpetual options are more accessible to a broader range of investors due to their lower entry barriers and the absence of intermediaries.
Benefits of Perpetual Options

- **Flexibility**: Perpetual options provide investors with the flexibility to exercise their options at any time, allowing them to capitalize on market movements and manage risk more effectively.

- **Portfolio Diversification**: The addition of perpetual options to an investment portfolio can help improve diversification and potentially enhance returns.
Leverage: Perpetual options enable investors to gain exposure to an underlying asset with a relatively small initial investment, providing them with the potential for higher returns.

- **Reduced Counterparty Risk**: As perpetual options are traded on decentralized exchanges, they are less susceptible to counterparty risk compared to traditional options traded on centralized exchanges.