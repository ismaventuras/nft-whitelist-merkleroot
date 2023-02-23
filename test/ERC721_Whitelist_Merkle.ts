import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {MerkleTree} from "merkletreejs";

const {keccak256} = ethers.utils

describe("ERC721_Whitelist_Merkle",  () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {

    // get a list of whitelisted and not whitelisted accounts
    // a merkle tree will be generated from whitelisted list
    const accounts = await ethers.getSigners();
    const whitelisted = accounts.slice(0,5)
    const notWhitelisted = accounts.slice(5,10)

    // generate the leaf nodes from the hashed addreses
    const leafNodes = whitelisted.map(addr => keccak256(addr.address))
    const tree = new MerkleTree(leafNodes, keccak256, {sort:true})
    const merkleRoot = tree.getHexRoot()
    const ERC721_Whitelist_Merkle = await ethers.getContractFactory("ERC721_Whitelist_Merkle");
    const ERC721_Whitelist_MerkleInstance = await ERC721_Whitelist_Merkle.deploy(merkleRoot);
    
    return { ERC721_Whitelist_MerkleInstance, whitelisted, notWhitelisted,merkleRoot ,tree };
  }


  describe("Whitelist", () => {
    it('allow only whitelisted accounts to mint', async () => {
      const {whitelisted,tree,notWhitelisted,ERC721_Whitelist_MerkleInstance} = await loadFixture(deployOneYearLockFixture)

      const merkleProof = tree.getHexProof(keccak256(whitelisted[0].address))
      const invalidMerkleProof = tree.getHexProof(keccak256(notWhitelisted[0].address))

      // executing tests as account 0 which should be whitelisted
      await expect(ERC721_Whitelist_MerkleInstance.claimWhitelist(merkleProof)).to.not.be.rejected
      //await expect(ERC721_Whitelist_MerkleInstance.claimWhitelist(merkleProof)).to.be.rejectedWith('Token for this address have been already claimed.')
      await expect(ERC721_Whitelist_MerkleInstance.claimWhitelist(merkleProof)).to.be.revertedWithCustomError(ERC721_Whitelist_MerkleInstance,'AlreadyClaimed')
      await expect(ERC721_Whitelist_MerkleInstance.connect(notWhitelisted[0]).claimWhitelist(invalidMerkleProof)).to.be.revertedWithCustomError(ERC721_Whitelist_MerkleInstance,'NotWhitelisted')

    })

    it('mints all claimable tokens', async () => {
      const {whitelisted,tree,notWhitelisted,ERC721_Whitelist_MerkleInstance} = await loadFixture(deployOneYearLockFixture)

      const proofs = whitelisted.map(signer => tree.getHexProof(keccak256(signer.address)))
      let i = 0
      for await (const merkleProof of proofs) {        
        await expect(ERC721_Whitelist_MerkleInstance.connect(whitelisted[i]).claimWhitelist(merkleProof)).to.not.be.rejected  
        //await expect(ERC721_Whitelist_MerkleInstance.connect(whitelisted[i]).claimWhitelist(merkleProof)).to.be.rejectedWith('Token for this address have been already claimed.')
        await expect(ERC721_Whitelist_MerkleInstance.claimWhitelist(merkleProof)).to.be.revertedWithCustomError(ERC721_Whitelist_MerkleInstance,'AlreadyClaimed')
        i++;
      }         

    })
  })


});
