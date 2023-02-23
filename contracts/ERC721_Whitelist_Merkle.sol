// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract ERC721_Whitelist_Merkle is ERC721 {
    error AlreadyClaimed();
    error NotWhitelisted();

    bytes32 public whitelistMerkleRoot;
    mapping(address => bool) public claimed;
    uint256 tokenIdCounter;

    constructor(bytes32 merkleRoot_) ERC721("ERC721_Whitelist_Merkle", "ERC721_Whitelist_Merkle") {
        whitelistMerkleRoot = merkleRoot_;
    }

    //hello
    function claimWhitelist(bytes32[] calldata merkleProof) public {
        if(claimed[msg.sender]) revert AlreadyClaimed();
        claimed[msg.sender] = true;
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        if(!MerkleProof.verifyCalldata(merkleProof,whitelistMerkleRoot, leaf)) revert NotWhitelisted();
        _mint(msg.sender, tokenIdCounter);
        tokenIdCounter++;
    }
}