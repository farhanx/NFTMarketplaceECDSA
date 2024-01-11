// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 
  const [deployer, minterMarketplace,buyer] = await ethers.getSigners();

  const Contract = await ethers.getContractFactory("PSTNFT");
  const PSTNFT = await Contract.attach("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9")
  console.log("returned contract:"+PSTNFT.target)

  let signer = await PSTNFT.returnSignedAuthority([200,3,"axysabc.jpg","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC","0x2ab5b94eb14951a767be6b061a3ffec9a11f74351a8976cfc32cba1c469f5d8a26111032985b8ff8ac5c6240122017a070114ba67113051deeac4aeec7e3cc551b"]);

  console.log("Verified Signer is : "+ signer);

  // nft is created
  const tx = await PSTNFT.connect(buyer).safeMinting([201,3,"axysabc.jpg","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC","0x2ab5b94eb14951a767be6b061a3ffec9a11f74351a8976cfc32cba1c469f5d8a26111032985b8ff8ac5c6240122017a070114ba67113051deeac4aeec7e3cc551b"],{
    value: 3
  })

  //
  console.log("Tx data"+tx);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
