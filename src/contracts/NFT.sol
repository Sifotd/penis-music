// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    struct NFTData {
        string ipfsDownloadUrl;
        string imageUri;
        bool isListed;
    }

    mapping(uint256 => NFTData) private _tokenData;

    uint256 private _totalSupply;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {
        _totalSupply = 1;
    }
   

    function mint(address to, string memory ipfsDownloadUrl, string memory imageUri) public onlyOwner returns (uint256) {
        uint256 newTokenId = _totalSupply + 1;
        _mint(to, newTokenId);
        _tokenData[newTokenId] = NFTData(ipfsDownloadUrl, imageUri, false);
        _totalSupply += 1;
        return newTokenId;

    }

    function setListingStatus(uint256 tokenId, bool isListed) public onlyOwner {
        require(tokenId <= _totalSupply, "ERC721: operator query for nonexistent token");
        _tokenData[tokenId].isListed = isListed;
    }

    function getTokenData(uint256 tokenId) public view returns (string memory, string memory, bool) {
        require(tokenId <= _totalSupply, "ERC721: operator query for nonexistent token");
        NFTData storage data = _tokenData[tokenId];
        return (data.ipfsDownloadUrl, data.imageUri, data.isListed);
    }

    // function balanceOf(address owner) public 
}
