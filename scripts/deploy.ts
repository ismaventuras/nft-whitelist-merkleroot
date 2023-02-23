import { ethers } from "hardhat";
const {keccak256} = ethers.utils
import {MerkleTree} from 'merkletreejs'


async function main() {

  const accounts = await ethers.getSigners();
  const whitelisted = accounts.slice(0,5)  

  const leafNodes = whitelisted.map(addr => keccak256(addr.address))
  const tree = new MerkleTree(leafNodes, keccak256, {sort:true})
  const merkleRoot = tree.getHexRoot()
  const MyERC721 = await ethers.getContractFactory("ERC721_Whitelist_Merkle");
  const instance = await MyERC721.deploy(merkleRoot);
  
  await instance.deployed();
  console.log(`ERC721_Whitelist_Merkle deployed to ${instance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
