// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./NFT.sol";
import "./NFTMarket.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract main {
    MyNFT myNFT;
    NFTMarket nftMarket;

    constructor() Ownable(msg.sender) {
        myNFT = new MyNFT();
        nftMarket = new NFTMarket(address(myNFT));
    }

    function mint(
        address to,
        string memory ipfsDownloadUrl,
        string memory imageUri
    ) public onlyOwner returns (uint256) {
        myNFT.mint(to, ipfsDownloadUrl, imageUri);
    }

    function setListingStatus(uint256 tokenId, bool isListed) public onlyOwner {
        myNFT.setListingStatus(tokenId, isListed);
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        myNFT.transferFrom(from, to, tokenId);
    }

    function listNFT(uint price, uint tokenId) public {
        address seller = msg.sender;
        myNFT.transferFrom(seller, address(nftMarket), tokenId);
        nftMarket.list(seller, price, tokenId);
    }

    function buyNFT(uint orderId) public {
        address buyer = msg.sender;
        nftMarket.buyNFT(buyer, orderId);
    }

    function getTokenData(
        uint256 tokenId
    ) public view returns (string memory, string memory, bool) {
        return myNFT.getTokenData(tokenId);
    }

    function getNft(address _owner) public view returns (uint256[] memory) {
        return myNFT.getNft(_owner);
    }

    function getOrderDate(
        uint orderId
    ) public view returns (uint, address, uint) {
        return nftMarket.getOrderDate(orderId);
    }

    function getUserOrder(address user) public view returns (uint[] memory) {
        return nftMarket.getUserOrder(user);
    }

    function getExistAllOrder() public view returns (uint256) {
        return nftMarket.getExistAllOrder();
    }
}
