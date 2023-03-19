require("@nomicfoundation/hardhat-toolbox");
require('solidity-coverage');
require("@nomicfoundation/hardhat-chai-matchers")
require('dotenv').config();
require("hardhat-gas-reporter");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {localhost:{
    url:"HTTP://127.0.0.1:8545",
    accounts: [`0x${process.env.PRIVATEKEY}`]
  },  testnet: {
    url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    chainId: 97,
    gasPrice: 20000000000,
    accounts: [`0x${process.env.PRIVATEKEY}`]
  },
  // mainnet: {
  //   url: "https://bsc-dataseed.binance.org/",
  //   chainId: 56,
  //   gasPrice: 20000000000,
  //   accounts: [`0x${process.env.PRIVATEKEY}`]
  // },
  mainnet: {
    url: `https://mainnet.infura.io/v3/${process.env.INFURIA_KEY}`, // or any other JSON-RPC provider
    chainId: 1,
    gasPrice: 14000000000,
    accounts: [`0x${process.env.PRIVATEKEY}`]
},

},etherscan: {
  apiKey: `${process.env.ETHERSCAN_KEY}`,
},
plugins: ["solidity-coverage"],

};