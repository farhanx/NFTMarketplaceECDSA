// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 
  const [deployer, minterMarketplace,buyer] = await ethers.getSigners();

  const nftName = "PAKISTANI NFTs";
  const nftSymbol = "PST";

  const PSTNFT = await hre.ethers.deployContract("PSTNFT", [nftName,nftSymbol,minterMarketplace.address]);

  const network = await ethers.provider.getNetwork();

  console.log("Chainid:"+network.chainId);
  console.log("The Deployer:"+deployer.address)
  console.log("The Minter:"+minterMarketplace.address)
  console.log("The Buyer:"+buyer.address)
  console.log("contract :"+PSTNFT.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
