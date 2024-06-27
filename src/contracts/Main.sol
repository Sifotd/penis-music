// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./NFT.sol";
import "./NFTMarket.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract main {
    PenisNFT penisNFT;
    NFTMarket nftMarket;
    Ownable ownable;

    constructor() {
        penisNFT = new PenisNFT();
        nftMarket = new NFTMarket(address(penisNFT));
    }

    function mint(
        address to,
        string memory ipfsDownloadUrl,
        string memory imageUrl
    ) public returns(uint256) {
        return penisNFT.mint(to, ipfsDownloadUrl, imageUrl);
    }

    // 此功能前端暂不调用与实现
    function transferFrom(address from, address to, uint256 tokenId) public {
        penisNFT.transferFrom(from, to, tokenId);
    }

    function listNFT(uint price, uint tokenId) public {
        address seller = msg.sender;
        penisNFT.transferFrom(seller, address(nftMarket), tokenId);
        nftMarket.list(seller, price, tokenId);
    }

    function buyNFT(uint orderId) public payable {
        address buyer = msg.sender;
        nftMarket.buyNFT{value: msg.value}(buyer, orderId);// 需要传入msg.value给market里的方法
    }

    function unlistNFT(uint orderId) public {
        address seller = msg.sender;
        nftMarket.unlistNFT(seller, orderId);
    }

    function getTokenData(
        uint256 tokenId
    ) public view returns (string memory, string memory, bool) {
        return penisNFT.getTokenData(tokenId);
    }

    function getNft(address _owner) public view returns (uint256[] memory) {
        return penisNFT.getNft(_owner);
    }

    function getorderData(
        uint orderId
    ) public view returns (uint, address, uint) {
        return nftMarket.getorderData(orderId);
    }

    function getUserOrder(address user) public view returns (uint[] memory) {
        return nftMarket.getUserOrder(user);
    }

    function getExistAllOrder() public view returns (uint256) {
        return nftMarket.getExistAllOrder();
    }

    function getNFTaddress() public view returns (address) {
        return address(penisNFT);
    }
    
    function getNFTMarketaddress() public view returns (address) {
        return address(nftMarket);
    }

    function getNFTowner(uint tokenId) public view returns (address) {
        return penisNFT.ownerOf(tokenId);
    }

    function getAllListedNFTs() public view returns(uint[] memory) {
       return nftMarket.getAllListedNFTs();
    }

    function getAllOrderIds() public view returns (uint[] memory) {
        return nftMarket.getAllOrderIds();
    }

    function getAllOrders() public view returns (NFTMarket.Order[] memory) {
        return nftMarket.getAllOrders();
    }

    function getOrdersByPage(uint page, uint pageSize) public view returns (NFTMarket.Order[] memory) {
       return nftMarket.getOrdersByPage(page, pageSize);
    }
}
