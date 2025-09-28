About

Actify is a Proof-of-Human-Activity (PoHA) protocol built on IoTeX. It connects wearables, smartphones, and IoT sensors to the blockchain via W3bstream, validating user activity and minting NFTs and token rewards. Sensitive activity data is secured through confidential computing, ensuring privacy while proving authenticity on-chain.

🌟 Features

Activity Verification: Validate real-world steps, workouts, and movements.

Reward System: Mint Proof-of-Activity NFTs and distribute token rewards.

Privacy-First: Only cryptographic proofs are sent on-chain; raw data stays confidential.

Seamless UX: Connect via IoPay or MetaMask for instant rewards.

DePIN Ready: Leveraging IoTeX for decentralized physical infrastructure.

🛠 Technologies Used

Blockchain: IoTeX

Smart Contracts: Solidity (ActivityNFT, RewardToken)

Development Tools: Hardhat, ethers.js

Frontend: React, Next.js

Wallet Integration: IoPay, MetaMask

Confidential Computing: Rust modules

Device Data Streaming: W3bstream

📦 Project Structure
actify/
├── contracts/          # Smart contracts (ActivityNFT.sol, RewardToken.sol)
├── hardhat/            # Hardhat config & deploy scripts
├── backend/            # Validator & API server (Node.js)
├── frontend/           # React frontend app
├── assets/             # Logo, UI images
└── README.md

💻 How it Works

User Activity: User performs activity via wearable or phone.

Data Validation: Backend validates activity using W3bstream + simple AI rules.

NFT Minting: Verified activity triggers mintActivity on-chain.

Reward Distribution: Tokens are sent to the user automatically.

Frontend Display: Users see their NFT, rewards, and leaderboard.

📈 Demo

Live Demo: https://actify.vercel.app

Video Demo: YouTube Link

⚡ Getting Started

Clone the repo:

git clone https://github.com/username/actify.git
cd actify


Install dependencies:

cd hardhat && npm install
cd ../backend && npm install
cd ../frontend && npm install


Set .env files for:

PRIVATE_KEY → Wallet owner for deploying contracts

IOTEX_TESTNET_RPC → https://babel-api.testnet.iotex.io

ACTIVITY_NFT_ADDRESS → Deployed ActivityNFT contract

Deploy contracts:

cd hardhat
npx hardhat compile
npx hardhat run scripts/deploy.js --network iotex_testnet


Run backend server:

cd backend
npm start


Run frontend app:

cd frontend
npm start

📚 Future Plans

Integrate Fitbit, Apple Health, Google Fit for live activity tracking

Build AI-based anti-cheat system

Launch community challenges and corporate wellness incentives

DAO governance for reward distribution and feature voting

📝 License

MIT License – see LICENSE
