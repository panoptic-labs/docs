---
slug: december-nutcracker
title: "December Nutcracker Trading Competition"
tags: [Gated Launch]
image: /img/banners/december-nutcracker.jpg
description: "Join Panoptic's December Nutcracker perpetual options trading competition by claiming, depositing, and trading free tokens daily for a chance to win exciting mystery prizes."
---

![](./1.jpg)

# 'Tis the Season

As the holiday spirit fills the air, Panoptic is excited to announce the launch of its December Nutcracker perpetual options trading competition on [Base](https://base.org/). Starting from December 19, 2023 and ending on February 22, 2024, this event promises to bring together the thrill of trading with the joy of the festive season. Over $10,000 in NFT prizes await!

  

## Claim Your Tokens

Everyone can claim free tokens daily. Here's how you can get started:

### Visit the onboarding page

Navigate to Panoptic’s [app](http://deeznuts.panoptic.xyz) to view the onboarding guide.

### Claim Daily

Users can claim tokens once every twenty-four hours from the faucet accessible on the onboarding page. The dispensed amounts are random and vary.

## Prizes

Over $10,000 in NFT prizes await the top traders! There are two reward categories:

### Nice reward
Nice accounts adhere strictly to fair play, involving no botting or external assistance.
-   Prize 1: [Lil Pudgy](https://opensea.io/collection/lilpudgys)
    
-   Qualifications: Highest score of nice accounts.
    

  

-   Prize 2: [Mfer](https://opensea.io/collection/mfers?tab=items)
    
-   Qualifications: Nice account with highest positive streamia percent for any single-leg short option (can be either a short put or a short call).
    

  

### Naughty reward
Naughty accounts are those which, while not engaging in sybil depositing, may show signs of assistance from other accounts, botting, sybil claiming, or price manipulation.
-   Prize: [Milady](https://opensea.io/collection/milady)
    
-   Qualifications: Highest score of naughty accounts. 
    
>Panoptic reserves full discretion in classifying accounts as naughty or nice based on their on-chain behavior. This classification plays a crucial role in determining eligibility for specific rewards.

## Rules

The competition revolves around acquiring tokens and trading perpetual options on the tokens. The goal is to acquire the most amount of December and Nutcracker tokens through fair means.

  

Traders are sorted by the highest geometric mean of their two token amounts, calculated as follows:

  

$\text{Account Score} = \sqrt{ \text{December Tokens} \times \text{Nutcracker Tokens} }$

  

For any single-leg short option, the percent of streamia earned is calculated as follows:

$\text{Streamia percent} = \frac{\text{Accumulated Streamia}}{\text{Leg Size}}$



Where for puts:

$\text{Accumulated Streamia} = \text{Strike Price} \times \text{Streamia from Asset} + \text{Streamia from Quote}$

and for calls:

$\text{Accumulated Streamia} = \frac{\text{Streamia from Quote}}{\text{Strike Price}} + \text{Streamia from Asset}$

  

Note that a single-leg short option can be either a naked (short) put or a naked (short) call.

  

## Naughty or Nice?

Accounts will be classified as one of three categories, depending on their on-chain behavior.

### Nice Accounts 🎁

Nice accounts engage in fair trading practices. These accounts claim tokens from the faucet, trade options through the official UI, swap on Uniswap, and show no signs of botting or external assistance.

### Naughty Accounts 🪨

Naughty accounts may exhibit signs of external assistance, botting, sybil claiming, or price manipulation. However, naughty accounts do NOT engage in sybil depositing. An example of naughty account behavior would be consistently placing trades shortly before another account manipulates the Uniswap pool price.

### Disqualified 💩

Accounts which directly engage in sybil depositing, shares transfers, or other methods of directly increasing their deposits through artificial means are subject to disqualification.

>It's important to note that the classification of accounts into these categories is subject to Panoptic's evaluation and discretion, ensuring a fair and competitive environment.
    

## Why allow naughty accounts?  
  
The goal of this trading competition is to thoroughly test the Panoptic protocol by inviting a wide spectrum of user behavior.

We want to hear from retail users about their trading experience, but we also want to understand how adversarial users may interact with the protocol in order for us to identify and fortify against potential economic vulnerabilities. Hence, we seek to encourage some adversarial behavior to better analyze the protocol’s economic stability.

## Technical Details

-   Participants are allowed to utilize multiple accounts (for naughty behavior).
    
-   Only tokens deposited into Panoptic will count towards your score. Withdrawn funds will not be counted. You can view your score at any time by visiting the [leaderboard](http://beta.panoptic.xyz/leaderboard).
    
-   Sybil depositing is not allowed. Sybil depositing is depositing tokens acquired from any means other than direct faucet claims or Uniswap pool swaps. An example of sybil depositing would be claiming tokens from the faucet through multiple wallets, followed by consolidating the tokens into one wallet, followed by depositing these consolidated tokens into one Panoptic account.
    
-   Sybil faucet claims are allowed, but depositing tokens obtained from sybil faucet claims is not allowed.
    
-   Price manipulation is allowed, but may qualify as “naughty”. Swapping in the Uniswap pool is allowed and causes the price to move. If you acquire tokens through sybil faucet claims and use them to manipulate the Uniswap pool price, you will be considered naughty (but not disqualified).
    

  

We will closely monitor activities and reserve the right to disqualify any accounts according to the above rules. Our goal is to ensure a fair and competitive environment for everyone involved.

  

The competition concludes on February 22. To avoid the concentration of incentives at a single block time, we will select a random closing time (in UTC), which will be disclosed only after the competition ends. For transparency and fairness, we'll publish the hash of this secret end time in advance. The hash is `7696191c3255d53a48840412dcac344109d0c662274065a4cd93cd1ce129fc65`. After the competition ends, we will determine and announce the winners, followed by the distribution of prizes.

## Disclaimer

>Please note that trading involves risks. This competition is designed for entertainment and educational purposes and should not be considered financial advice.

  

Ready to join the holiday fun? Start trading [now](http://deeznuts.panoptic.xyz).

  
*Join the growing community of Panoptimists and be the first to hear our latest updates by following us on our [social media platforms](https://links.panoptic.xyz/all). To learn more about Panoptic and all things DeFi options, check out our [docs](https://panoptic.xyz/docs/intro) and head to our [website](https://panoptic.xyz/).*
