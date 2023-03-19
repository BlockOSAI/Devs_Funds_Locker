// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() { 
    const [deployer] = await hre.ethers.getSigners();  
    const Locker = await  hre.ethers.getContractFactory("BOSAI_Dev_Funds_Locker");
    const locker = await Locker.deploy("0xC55953ca9Be22AEd1F9BD97c7985D96e9E8508d1","0x6d40ddDC4E704DEc5fcB25162DC4960F54E7c3e9");
  
    console.log("Locker address:", locker.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });