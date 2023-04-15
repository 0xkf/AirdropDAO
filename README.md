# AirdropDAO

## Summary
[TBD]
Airdrop DAO will onboard next 1 billion people.
We realize super easy UX to have Wallet.
We send Account Abstraction Wallet when user authorized some social account,


Only Demo movie [TBD(LIB)]

Presentation  movie: [TBD(LIB)]

## Problem

[TBD]
Problem

It is very difficult to start crypto.

・If you become interested in crypto, you need to set up MetaMask.
・You need to acquire tokens on a CEX and transfer them to your wallet.
・You need to connect your wallet and sign in on Dapps.
## Solution
[TBD]
Solution
・Easy login using Google authentication or similar methods
・Transactions without the need for gas fees
・A situation where there is no need to manage private keys

### Architecture
[TBD]
Please find the English translation below.

Architecture

・By using Google Auth for login, we automatically provide users with an Account Abstraction Wallet, making it easy to obtain a wallet. Users can acquire NFTs and FTs with a single click, even if they don't have a wallet.

・During this process, users don't have to pay gas fees due to gasless transactions, and since the tokens have gone through a community audit, there is less concern about receiving scam tokens.

・Companies that want to expand their community can propose detailed information about airdrop in a proposal, which will help them learn whether a token airdrop is feasible or not.


### Unique Point
[TBD]
We can onboard new user who doesn't have wallet yet.
the airdropped token is selected by community,using UMA,sbapshot voting,called Osnap.


## User Flow

[TBD]
１.visit website.
２.Authenticate some social
３.push button to get some ft or NFT


## Future Work
[TBD]
1.Realize sybil attack resistance, selecting some ID solution.
2.We will start advertisement function for the company that want to sell some product and for users that want to trade without paying gas.
3.Find ecosystem partners.

## TechStack

| Title | Usage |
| --- | --- |
| Account Abstraction |  To provide users with a no-cost gas experience |
| Airstack | To obtain past Mint information and provide a safe and secure experience for users |
| UMA |  To implement a campaign to Giveaway safer and more secure NFTs through consensus on the use of OnSnap. |
| SnapShot |  Same as above |
| OpenAI |  To produce a unique and interesting NFT |
| Hardhat |  To implement the contract productively |
| Web3Auth |  To provide a smooth experience by not requiring users to have a private key through social authentication |

## Deployed contract

### Polygon

| contract | contract address |
| --- | --- |
| ERC721 | 0x981116f806898F1C1eCB1d3BF2AF4f2140B1BB92 |

### VotingSynstem

| contract | contract address |
| --- | --- |
| SnapShot | [TBD] |
| UMA | [TBD] |

## Others

### The repo of Generative AI NFT
https://github.com/AAAirdropper/ETHGlobalTokyoNFT
