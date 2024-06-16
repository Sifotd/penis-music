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
    mapping(address=> UserNFTs) private userTokenId;
    mapping(address=>uint) totalOwn;
    uint256 private _totalSupply;
    struct UserNFTs{
    uint256[] tokenIds;//存储每个用户的nftid
}
    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {
        _totalSupply = 0;
    }
   


    function mint(address to, string memory ipfsDownloadUrl, string memory imageUri) public onlyOwner returns (uint256) {
        uint256 newTokenId = _totalSupply + 1;
        _mint(to, newTokenId);
        _tokenData[newTokenId] = NFTData(ipfsDownloadUrl, imageUri, false);
        _totalSupply += 1;
   
        //更新用户拥有的tokenid
         userTokenId[to].tokenIds.push(newTokenId);
        totalOwn[to]++;
        
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

      function  getNft(address _owner)public view returns(uint256[] memory){//根据地址查询，返回该地址nft的tokenid，

        return userTokenId[_owner].tokenIds;
     }

     
    //交易
    function transferFrom(address from,address to, uint256 tokenId)public override {
      //先检查发起者和签名
      require(__isApprovedOrOwner(_msg.sender(),tokenId),"ERC721: transfer caller is not owner nor approved");
        _transfer(from,to,tokenId);
        //更新发送者，接收者拥有的tokenid
//移除发送者的tokenId
uint256 removeId =searchRemove(from, tokenId);

    userTokenId[from].tokenIds[removeId] = userTokenId[from].tokenIds[userTokenId[from].tokenIds.length-1];//与末尾交换位置
    userTokenId[from].tokenIds.pop();//移除
    totalOwn[from]--;//拥有数量-1


//增加接收者的nft记录
userTokenId[to].tokenIds.push(tokenId);//增加
totalOwn[to]++;

    }

    //辅助函数，查询需要移除的tokenid
    function searchRemove(address user,uint256 tokenId) public view returns (uint256){
        for(uint256 i=0;i<userTokenId[user].tokenIds.length;i++){
        if(userTokenId[user].tokenIds[i] == tokenId){
           return i;
               }
        }
    return 0;//返回无效值
    }

}
