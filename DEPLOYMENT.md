# Actify Smart Contracts Deployment Guide

## Prerequisites

1. **Node.js 18+** installed
2. **MetaMask** wallet with IoTeX Testnet configured
3. **IOTX tokens** for gas fees ([Get from faucet](https://faucet.iotex.io/))

## Setup

### 1. Install Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts dotenv
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
IOTEX_TESTNET_RPC=https://babel-api.testnet.iotex.io
IOTEX_MAINNET_RPC=https://babel-api.mainnet.iotex.io
PRIVATE_KEY=ccd592955623bd7b423686ef3a9f4b55715a7cb1303f874cd34ea5f3a64ad8ea
```

### 3. Add IoTeX Testnet to MetaMask

- **Network Name:** IoTeX Testnet
- **RPC URL:** https://babel-api.testnet.iotex.io
- **Chain ID:** 4690
- **Currency Symbol:** IOTX
- **Block Explorer:** https://testnet.iotexscan.io/

## Deployment

### Compile Contracts

```bash
npx hardhat compile
```

### Deploy to IoTeX Testnet

```bash
npx hardhat run scripts/deploy.js --network iotex_testnet
```

### Deploy to IoTeX Mainnet

```bash
npx hardhat run scripts/deploy.js --network iotex_mainnet
```

## Post-Deployment

After successful deployment, you'll see output like:

```
==================================================
DEPLOYMENT SUMMARY
==================================================
Network: iotex_testnet
Chain ID: 4690
RewardToken (ACTR): 0x1234...
ActivityNFT (ACTA): 0x5678...
==================================================
```

### Update Frontend Configuration

Update `src/lib/contractConfig.ts` with the deployed addresses:

```typescript
export const CONTRACT_ADDRESSES = {
  testnet: {
    rewardToken: '0x1234...', // Your deployed RewardToken address
    activityNFT: '0x5678...'  // Your deployed ActivityNFT address
  }
};
```

## Verify Deployment

1. Check contracts on [IoTeX Testnet Explorer](https://testnet.iotexscan.io/)
2. Verify RewardToken balance of ActivityNFT contract (should be 10,000 ACTR)
3. Test minting an activity NFT from the frontend

## Smart Contracts

### RewardToken (ACTR)

- **Type:** ERC20
- **Name:** Actify Reward
- **Symbol:** ACTR
- **Initial Supply:** 1,000,000 ACTR
- **Decimals:** 18

### ActivityNFT (ACTA)

- **Type:** ERC721
- **Name:** Actify Activity
- **Symbol:** ACTA
- **Reward per Activity:** 10 ACTR
- **Features:** Stores activity metadata on-chain

## Troubleshooting

### "Insufficient funds"
- Get IOTX from the [faucet](https://faucet.iotex.io/)
- Check balance: `npx hardhat run scripts/check-balance.js --network iotex_testnet`

### "sender must be an owner"
- Ensure the deployment wallet matches the private key in `.env`
- The deployer automatically becomes the owner

### "nonce too low"
- Clear pending transactions or wait for confirmation
- Try resetting your MetaMask account

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file to Git
- Use separate wallets for testnet and mainnet
- For production, use a multisig wallet or hardware wallet
- Store private keys securely

## Resources

- [IoTeX Documentation](https://docs.iotex.io/)
- [IoTeX Testnet Faucet](https://faucet.iotex.io/)
- [IoTeX Testnet Explorer](https://testnet.iotexscan.io/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
