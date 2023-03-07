---
sidebar_position: 1
---

# Frequently Asked Questions
There's a good chance it's been asked before :)

<details>
<summary>Is there a token?</summary>
No. Panoptic does not have a token at this time.  
</details>

<details>
<summary>Wen launch?</summary>
Testnet is scheduled for September 2023. Mainnet is scheduled for Q4 2023. See our <a href="https://blog.panoptic.xyz/panoptics-v1-roadmap-d7b72a8e2005">roadmap</a>.
</details>

<details>
<summary>What chain will Panoptic launch on?</summary>
Panoptic will launch on Ethereum mainnet.
</details>

<details>
<summary>Will Panoptic launch on an L2?</summary>
Yes, after Panoptic launches on Ethereum mainnet.
</details>

<details>
<summary>Will there be a code audit?</summary>
Yes. Panoptic <a href="https://blog.panoptic.xyz/abdk-completes-panoptics-first-audit-panoptic-announces-second-audit-with-openzeppelin-c7216cdbfd4f">was audited by ABDK</a> and is currently undergoing an audit with OpenZeppelin. There will also be an audit by Code4Arena in Q2-Q3 2023. See our <a href="https://blog.panoptic.xyz/panoptics-v1-roadmap-d7b72a8e2005">roadmap</a>.
</details>

<details>
<summary>Does Panoptic only allow for limited upside positions?</summary>
No. You can create limited upside, unlimited upside, limited downside, and unlimited downside positions by <a href="https://twitter.com/Panoptic_xyz/status/1628530117118169088?s=20">combining put and call options</a> on Panoptic.
</details>

<details>
<summary>Is Panoptic only useful for hedging Uniswap LP positions?</summary>
No. While Panoptic allows you to hedge against Uniswap LP positions by shorting them, it also allows you to create puts, calls, straddles, jade lizards, zebra spreads, and <a href="https://twitter.com/Panoptic_xyz/status/1628530117118169088?s=20">many other custom option payoffs</a>!
</details>

<details>
<summary>What tokens can I trade options on?</summary>
Any token pair on Uniswap V3. The Panoptic protocol enables permissionless options trading for longtail assets just as Uniswap allows for permissionless spot trading for longtail assets.
</details>

<details>
<summary>Can I sell options at any strike?</summary>
Yes.
</details>

<details>
<summary>Can I buy options at any strike?</summary>
Yes, as long as there is enough seller liquidity at that strike.
</details>

<details>
<summary>Does someone have to sell an option before I can buy the option?</summary>
Yes.
</details>

<details>
<summary>What is the Panoptic liquidity provider (PLP) role? How is this different from the option seller?</summary>
The Panoptic liquidity provider (PLP) provides fungible liquidity to the Panoptic pool and receives commission fees in return. This differs from the liquidity provider (LP) who deploys liquidity in a Uniswap V3 pool and receives swap fees in return. The option seller borrows liquidity from the PLP to deploy in a Uniswap V3 pool as an LP. This act of moving liquidity from the Panoptic pool to the Uniswap pool constitutes selling an option.   
<br/><br/>
Example A: Alice is a PLP for the ETH-USDC pool on Panoptic. She can deposit ETH, USDC, or both ETH & USDC into the pool. She receives a share of commission fees in return.  
<br/><br/>
Example B: Bob is an option seller for ETH-USDC options. After depositing some collateral to the ETH-USDC pool on Panoptic (making him a PLP), he borrows a larger amount of ETH & USDC. The Panoptic protocol deploys his borrowed ETH & USDC into the ETH-USDC pool on Uniswap (making him an LP). His LP position on Uniswap has the same payoffs as a short option (making him an option seller).
</details>

<details>
<summary>Do Panoptic liquidity providers (PLPs) suffer impermanent loss (IL)?</summary>
No, Panoptic liquidity providers (PLPs) do not suffer IL from Uniswap LP positions. PLPs earn commission fees, and take on protocol risk (e.g. if the Panoptic pool is underwater, then PLPs can lose capital).
</details>

<!-- <details>
<summary>Why does moving an LP position constitute trading an option?</summary>

</details> -->

<details>
<summary>Why should I sell an option on Panoptic when I can just LP directly on Uniswap?</summary>
Selling an option on Panoptic has the same before-fees payoff as LPing on Uniswap. However, selling an option on Panoptic earns a premium (paid by the option buyer) that is greater than or equal to the swap fees earned by an LP position.
</details>

<!-- <details>
<summary>What does it cost to sell an option?</summary>
Selling an option costs a commission fee and gas fee. The commission fee is 0.2% to 0.6% of the notional value of the option position, depending on the <a href="https://docs.panoptic.xyz/docs/panoptic-protocol/commission#commission-rate-and-pool-utilization">pool utilization</a> at the time of sell. There is no commission fee to close the position.
</details> -->

<!-- <details>
<summary>What does it cost to buy an option?</summary>
Buying an option costs a commission fee, premium, and gas fee. The commission fee is 0.2% to 0.6% of the notional value of the option position, depending on the <a href="https://docs.panoptic.xyz/docs/panoptic-protocol/commission#commission-rate-and-pool-utilization">pool utilization</a> at the time of purchase. The premium starts at 0, and accumulates while the underlying price remains in range. There is no commission fee to close the position.
</details> -->

<!-- <details>
<summary>How is the premium calculated?</summary>
The premium is equal to the amount of swap fees the borrowed LP position would have earned in the Uniswap pool, multiplied by a spread multiplier.  
</br></br>
Example: Alice sells an out-of-the-money (OTM) ETH-USDC put option, with strike = 1000 and width = ±10%. Bob buys the OTM put option from Alice for 0 upfront premium. If the ETH-USDC price moves between 909 and 1100, the option is “in range” and would have earned swap fees from the Uniswap pool. If the ETH-USDC price is above 1100 or below 909, the option is “out of range” and would not have earned any swap fees. Bob owes the total amount of accumulated swap fees to Alice as premium.
</details> -->

<!-- <details>
<summary>What is the commission fee?</summary>
This is the fee to mint an option. When an option seller or buyer opens their position, they pay a commission fee on the notional value of the position. The commission is paid to the PLPs. The commission fee percentage varies between 0.2% - 0.6% based on <a href="https://docs.panoptic.xyz/docs/panoptic-protocol/commission#commission-rate-and-pool-utilization">pool utilization</a>.
</details> -->
 
<!-- 
20.	How are you different from InfinityPools?
21.	How are you different from GammaSwap?
22.	How are you different from Lyra?
23.	Why doesn’t Panoptic need oracles?
24.	Is my liquidity locked?
25.	How can I close my seller position?
26.	How can I get liquidated?
 -->
