# Actify

Actify is a Proof-of-Human-Activity (PoHA) protocol built on IoTeX. It connects wearables, smartphones, and IoT sensors to the blockchain via W3bstream, validating user activity and minting NFTs and token rewards. Sensitive activity data is secured through confidential computing, ensuring privacy while proving authenticity on-chain.

## 🌟 Features

- **Activity Verification**: Validate real-world steps, workouts, and movements
- **Reward System**: Mint Proof-of-Activity NFTs and distribute token rewards
- **Privacy-First**: Only cryptographic proofs are sent on-chain; raw data stays confidential
- **Seamless UX**: Connect via MetaMask for instant rewards
- **DePIN Ready**: Leveraging IoTeX for decentralized physical infrastructure

## 🛠 Technologies Used

- **Blockchain**: IoTeX (Mainnet & Testnet)
- **Smart Contracts**: Solidity (ActivityNFT, RewardToken)
- **Development Tools**: Hardhat, ethers.js
- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Wallet Integration**: MetaMask
- **Confidential Computing**: W3bstream integration
- **Device Data Streaming**: IoT sensors, wearables

## 📦 Project Structure

```
actify/
├── contracts/          # Smart contracts (ActivityNFT.sol, RewardToken.sol)
├── hardhat/            # Hardhat config & deploy scripts
├── backend/            # Validator & API server (Node.js)
├── src/                # React frontend app
│   ├── components/     # UI components
│   ├── pages/          # Page components
│   └── hooks/          # Custom React hooks
└── README.md
```

## 💻 How it Works

1. **User Activity**: User performs activity via wearable, phone, or manual input
2. **Data Validation**: Backend validates activity using W3bstream + validation rules
3. **NFT Minting**: Verified activity triggers `mintActivity` on-chain
4. **Reward Distribution**: Tokens are sent to the user automatically
5. **Frontend Display**: Users see their NFT, rewards, and activity history

## 📈 Live Demo

**Frontend**: [https://actify.vercel.app](https://human-step-mint.vercel.app/)

**Video Demo**: [YouTube](https://youtu.be/nm-JEdRwyHE)

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- MetaMask wallet
- IoTeX Testnet or Mainnet setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/blambuer10/human-step-mint
cd actify
```

2. Install frontend dependencies:
```bash
npm install
```

3. Set up smart contracts (if deploying):
```bash
cd hardhat
npm install
```

4. Set up backend (if running validator):
```bash
cd backend
npm install
```

### Environment Variables

Create `.env` files for each component:

**Hardhat (`hardhat/.env`)**:
```
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
IOTEX_TESTNET_RPC=https://babel-api.testnet.iotex.io
IOTEX_MAINNET_RPC=https://babel-api.mainnet.iotex.io
```

**Backend (`backend/.env`)**:
```
IOTEX_TESTNET_RPC=https://babel-api.testnet.iotex.io
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
ACTIVITY_NFT_ADDRESS=0x...
REWARD_TOKEN_ADDRESS=0x...
PORT=4000
```

**Frontend (`.env`)**:
```
VITE_BACKEND_URL=http://localhost:4000
```

### Deploy Smart Contracts

```bash
cd hardhat
npx hardhat compile
npx hardhat run scripts/deploy.js --network iotex_testnet
```

Save the deployed contract addresses for backend configuration.

### Run Backend

```bash
cd backend
npm start
```

### Run Frontend

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🔐 Smart Contracts

### RewardToken (ERC20)

Token used for activity rewards with minting capabilities for the contract owner.

### ActivityNFT (ERC721)

NFT contract that mints unique activity proofs and automatically distributes reward tokens.

**Key Functions**:
- `mintActivity(address to, string memory metadata)`: Mints NFT and sends reward tokens
- `setRewardAmount(uint256 amount)`: Updates reward amount per activity

## 🌐 Network Information

**IoTeX Testnet**:
- RPC: `https://babel-api.testnet.iotex.io`
- Chain ID: 4690
- Explorer: https://testnet.iotexscan.io/

**IoTeX Mainnet**:
- RPC: `https://babel-api.mainnet.iotex.io`
- Chain ID: 4689
- Explorer: https://iotexscan.io/

## 📚 Future Plans

- Integrate Fitbit, Apple Health, Google Fit for live activity tracking
- Build AI-based anti-cheat system
- Launch community challenges and corporate wellness incentives
- DAO governance for reward distribution and feature voting
- Enhanced confidential computing with W3bstream

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License – see LICENSE file for details

## 🔗 Resources

- [IoTeX Documentation](https://docs.iotex.io)
- [W3bstream](https://w3bstream.com)
- [Hardhat Documentation](https://hardhat.org)
