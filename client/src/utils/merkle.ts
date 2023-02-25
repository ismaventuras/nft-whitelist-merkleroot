import MerkleTree from "merkletreejs";
import { ethers } from "ethers";
const { keccak256 } = ethers.utils;

export function generateTree(addressList: string[]) {
    const leafNodes = addressList.map((addr) => keccak256(addr));
    return new MerkleTree(leafNodes, keccak256, { sort: true });
};

export function getProof(tree: MerkleTree, address: string): string[] {
    return tree.getHexProof(keccak256(address))
}