import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "./tasks";


const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks:{
    hardhat:{
      chainId: 1337
    }
  }
};

export default config;
