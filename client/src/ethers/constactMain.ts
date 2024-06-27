import { ethers } from "ethers";

/*
import abi 
*/
import * as contractMainJson from "Main.json" assert {type: "json"};

///  1. 创建provider和wallet
//这个就是RPC的地址 需要合约端提供
const ALCHEMY_GOERLI_URL = 'https://eth-goerli.alchemyapi.io/v2/GlaeWuylnNM3uuOo-SAwJxuwTdqHaY5l';

const abiMain = contractMainJson.default.object;
//const abiNFTMarket = contractNFTMarketJson.default.object;

const MainAddress = "0x690b82598466fb73adb7195d3411a49b3039c2ef";

/// wallet 对象 获取 
//TODO: 此处代码需要重构 此处的Provider要从wallet对象里用getProvider方法的方式获取 。 目前只是用做测试
const provider = new ethers.BrowserProvider(window.ethereum);

const contractMain = new ethers.Contract(MainAddress, abiMain, provider);

function getMetaMaskProvider(){
    if (typeof window.ethereum === "undefined") {
        alert("please install the metamask wallet!");
        return;
    }
    const accounts = await provider.send("eth_requestAccounts", []);
    let provider = new ethers.BrowserProvider(window.ethereum)
    return provider;
}

function getWalletAddress(provider){
    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0]
    console.log(`钱包地址: ${account}`)
    return account;
} 

//需要去判断一下对应的是哪条链上的数据

//获取constactNFTMarket的引用 用来填充购物清单列表 需要刷新到页面orderList中去
const GetOrderList = async() =>{
   return await contractMain.getExistAllOrder();
}

//获取用户购物列表 
const GetOrderListByUser = async() => {
    let provider = getMetaMaskProvider();
    let address = getWalletAddress(provider)
    return await contractMain.getUserOrder(address);
}

//前端渲染界面OrderList点击中间的item 传递给该函数 
const GetOrderDetailByOrderId = async(orderId) =>{
    return await contractMain.getOrderDate(orderId);
}


const GetNftFromUser = async(getWalletAddress)=>{
    return await contractMain.getNft(getWalletAddress);
}

const TokenId = async(tokenId) => {
    return await contractMain.getTokenData(tokenId);
}
//前端点击其中的一个item 把orderId 传进去
const getNft = async(orderId) => {
    return await contractMain.buyNFT(orderId);
}

//渲染整个Nft的列表
const NftList = async(price,tokenId) => {
    return await contractMain.listNFT(price,tokenId);
}
//const a  = await NftList(price,tokenId)
//console.log(a)
/// transferFrom方法用来空投的 而且这次的应用不涉及交易 先不写。