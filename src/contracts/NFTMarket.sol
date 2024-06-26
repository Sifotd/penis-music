// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


pragma solidity ^0.8.0;

contract NFTMarket {
    constructor(address _NFTAddress) {
        NFTAddress = _NFTAddress;
        owner = msg.sender;
    }

    address NFTAddress;

    address owner;

    uint256 public contractBalance;

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }


    struct Order {
        uint orderId;
        uint tokenId;
        address sellAddr;
        uint price;
    }

    mapping(uint => Order) orderData; //永久保存所有Order
    mapping(uint => Order) allOrder; //保存当前存在的Order
    mapping(address => mapping(uint => uint)) userOrder;
    mapping(address => uint) userTotalOrder;

    uint totalOrder; //记录当前存在的所有Order
    uint OrderIndex; //id生成器

    //上架NFT
    function list(address seller, uint price, uint tokenId) public onlyOwner{
        OrderIndex += 1;
        totalOrder += 1;
        orderData[OrderIndex] = Order(OrderIndex, tokenId, seller, price);
        userTotalOrder[seller] += 1;
        userOrder[seller][userTotalOrder[seller]] = OrderIndex;
        allOrder[totalOrder] = Order(OrderIndex, tokenId, seller, price);
        // ERC721(NFTAddress).approve(owner,tokenId);
    }

    //购买NFT
    function buyNFT(address buyer, uint orderId) public payable onlyOwner{
        uint price = orderData[orderId].price;
        uint tokenId = orderData[orderId].tokenId;
        address seller = orderData[orderId].sellAddr;

        require(msg.value >= price,"price is too low");

        // IMain(owner).transferFrom(address(this), buyer, tokenId);
        ERC721(NFTAddress).approve(address(this),tokenId);
        ERC721(NFTAddress).transferFrom(address(this), buyer, tokenId);

        payable(seller).transfer(price);

        removeOrder(seller, orderId);
    }

    //移出指定订单
    function removeOrder(address seller, uint orderId) internal {
        address _seller = orderData[orderId].sellAddr;
        require(seller == _seller, "the 'seller' parameter is not the order seller");

        for (uint256 index = 1; index < userTotalOrder[seller]; index++) {
            uint _orderId = userOrder[seller][index];
            if (_orderId == orderId) {
                userOrder[seller][index] = userOrder[seller][
                    userTotalOrder[seller]
                ];
            }
        }

        userTotalOrder[seller] -= 1;

        allOrder[orderId] = allOrder[totalOrder];
        totalOrder -= 1;
    }

    function unlistNFT(address seller,uint orderId) public onlyOwner{
        require(seller == orderData[orderId].sellAddr, "msg.sender is not the NFT owner");
        uint tokenId = orderData[orderId].tokenId;
        ERC721(NFTAddress).transferFrom(address(this), seller, tokenId);
        removeOrder(seller, orderId);
    }

    //根据指定orderId获取订单信息
    function getorderData(
        uint orderId
    ) public view returns (uint tokenId, address sellerAddr, uint price) {
        tokenId = orderData[orderId].tokenId;
        sellerAddr = orderData[orderId].sellAddr;
        price = orderData[orderId].price;
    }

    //根据地址获取该地址所有的orderId
    function getUserOrder(address user) public view returns (uint[] memory) {
        uint userTotalOrders = userTotalOrder[user];
        uint[] memory orders = new uint[](userTotalOrders);
        for (uint256 index = 0; index < userTotalOrders; index++) {
            orders[index] = userOrder[user][index + 1];
        }
        return orders;
    }

    //返回当前存在的订单总数
    function getExistAllOrder() public view returns (uint256) {
        return totalOrder;
    }

    // 返回所有的OrderId
    function getAllOrderIds() public view returns (uint[] memory) {
        uint[] memory orderIds = new uint[](totalOrder);
        for (uint256 i = 1; i <= totalOrder; i++) {
            orderIds[i - 1] = orderData[i].orderId;
        }
        return orderIds;
    
    }

    // 返回所有的Order信息
    function getAllOrders() public view returns (Order[] memory) {
        Order[] memory orders = new Order[](totalOrder);
        for (uint256 i = 1; i <= totalOrder; i++) {
            orders[i - 1] = allOrder[i];
        }
        return orders;
    }

    // 返回特定分页的Order
    function getOrdersByPage(uint page, uint pageSize) public view returns (Order[] memory) {
        require(page > 0, "Page number should be greater than 0");
        require(pageSize > 0, "Page size should be greater than 0");

        uint startIndex = (page - 1) * pageSize + 1;
        uint endIndex = page * pageSize;

        // 如果起始索引超过总订单数，则返回空数组
        require(startIndex < totalOrder, "page should less than total Order number");

        // 如果结束索引超过总订单数，则设置为总订单数
        if (endIndex > totalOrder) {
            endIndex = totalOrder;
        }

        uint length = endIndex - startIndex + 1;
        Order[] memory orders = new Order[](length);

        for (uint256 i = 0; i < length; i++) {
            orders[i] = allOrder[startIndex + i];
        }

        return orders;
    }

}
