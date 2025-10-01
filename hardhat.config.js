require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    iotex_testnet: {
      url: process.env.IOTEX_TESTNET_RPC || "https://babel-api.testnet.iotex.io",
      chainId: 4690,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    iotex_mainnet: {
      url: process.env.IOTEX_MAINNET_RPC || "https://babel-api.mainnet.iotex.io",
      chainId: 4689,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
