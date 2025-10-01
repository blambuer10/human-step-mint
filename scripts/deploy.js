const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy RewardToken
  console.log("\nDeploying RewardToken...");
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.waitForDeployment();
  const rewardTokenAddress = await rewardToken.getAddress();
  console.log("✅ RewardToken deployed to:", rewardTokenAddress);

  // Deploy ActivityNFT
  console.log("\nDeploying ActivityNFT...");
  const rewardAmount = hre.ethers.parseUnits("10", 18); // 10 tokens per activity
  const ActivityNFT = await hre.ethers.getContractFactory("ActivityNFT");
  const activityNFT = await ActivityNFT.deploy(rewardTokenAddress, rewardAmount);
  await activityNFT.waitForDeployment();
  const activityNFTAddress = await activityNFT.getAddress();
  console.log("✅ ActivityNFT deployed to:", activityNFTAddress);

  // Fund NFT contract with tokens
  console.log("\nFunding NFT contract with tokens...");
  const fundingAmount = hre.ethers.parseUnits("10000", 18); // 10,000 tokens
  const mintTx = await rewardToken.mint(activityNFTAddress, fundingAmount);
  await mintTx.wait();
  console.log("✅ Funded NFT contract with 10,000 ACTR tokens");

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("DEPLOYMENT SUMMARY");
  console.log("=".repeat(50));
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", hre.network.config.chainId);
  console.log("RewardToken (ACTR):", rewardTokenAddress);
  console.log("ActivityNFT (ACTA):", activityNFTAddress);
  console.log("=".repeat(50));
  
  console.log("\n📝 Add these to your frontend configuration:");
  console.log(`REWARD_TOKEN_ADDRESS=${rewardTokenAddress}`);
  console.log(`ACTIVITY_NFT_ADDRESS=${activityNFTAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
