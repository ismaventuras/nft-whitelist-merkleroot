# NFT Whitelist Hardhat

This project demonstrate how to implement a ERC721 NFT Whitelist using merkle root.

The smart contract uses OpenZeppelin Merkle Proof smart contract to verify the merkle root.

The whitelisted addresses are set from hardhat default accounts, the first 5 accounts are whitelisted while the others are not.

A demo using React has been provided in the client folder.

## Quickstart

```bash
git clone https://github.com/ismaventuras/nft-whitelist-merkleroot
# run dependencies
npm install
# (on a new terminal) run a local node
npm run node
# deploy contracts and start the client on port 3000
npm start
```

## Test

```powershell
nft-whitelist> npm test

  ERC721_Whitelist_Merkle
    Whitelist
      √ allow only whitelisted accounts to mint
      √ mints all claimable tokens

  2 passing (1s)

```

## Deployment

**Step 1** - Open another terminal and start a local blockchain.

```bash
nft-whitelist> npx hardhat node
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
                                ...

```

**Step 2** - Deploy your contract

```powershell
nft-whitelist> npx hardhat run --network localhost .\scripts\deploy.ts
ERC721_Whitelist_Merkle deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
