import { ethers } from "ethers";
import { useConfigure } from '@/store/configure'
import MainConfig from './Main.json';

async function registerContract() {
  const MainAddress = "0xf48090b59e55BA91854d4Ad4E4C73C63eEf1259A";
  const MarketPlaceAddress = "0x23Ca8a844a610B900DeFf0d9a25368788bB8446A";
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner();
  const contractMain = new ethers.Contract(MainAddress, MainConfig, signer);

  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const account = accounts[0]

  const mint = async (ipfsDownloadUrl: string) => {
    const result = await contractMain.mint(account, ipfsDownloadUrl);
    console.log('result', result);
  }

  const getAllOrders = async () => {
    const orderList = await contractMain.getAllOrders();
    return Promise.all(orderList.map(async (orderData: any) => {
      const tokenData = await getTokenData(orderData[1]);
      return {
        id: tokenData.id,
        orderId: orderData[0],
        saler: orderData[2],
        price: Number(orderData[3]) / (10 ** 18),
        musicUrl: tokenData.musicUrl,
        imageUrl: tokenData.imageUrl
      }
    }))
  }

  const getNft = async (address: string) => { 
    return await contractMain.getNft(address);
  }

  const getTokenData = async (tokenId: number) => {
    const tokenData = await contractMain.getTokenData(tokenId);
    const response = await fetch(tokenData[1]);
    const imageData = await response.json();
    return {
      id: tokenId,
      musicUrl: tokenData[0],
      imageUrl: imageData.image
    }
  }

  const getNFTowner = async (tokenId: number) => {
    return await contractMain.getNFTowner(tokenId);
  }

  const isNFTPutOnSale = async (tokenId: number) => {
    const owner = await getNFTowner(tokenId);
    return owner === MarketPlaceAddress
  }

  const listNFT = async (price: number, tokenId: number) => {
    return await contractMain.listNFT(price, tokenId);
  }

  const unlistNFT = async (orderId: BigInt) => {
    return await contractMain.unlistNFT(orderId);
  }

  const getUserOrders = async (address: string) => {
    return await contractMain.getUserOrder(address);
  }

  const getOrderData = async (orderId: number) => {
    const orderData = await contractMain.getorderData(orderId);
    const tokenData = await getTokenData(orderData[0]);
    return {
      id: tokenData.id,
      orderId: orderId,
      saler: orderData[1],
      price: Number(orderData[2]) / (10 ** 18),
      musicUrl: tokenData.musicUrl,
      imageUrl: tokenData.imageUrl
    }
  }

  const getAllListedNFTs = async () => {
    const nftList = await contractMain.getAllListedNFTs();
    console.log('allListedNFTs', result);
  }

  const buyNFT = async (orderData: any) => {
    return await contractMain.buyNFT(orderData.orderId, {
      value: BigInt(orderData.price * 10 ** 18)
    });
  }

  return {
    mint,
    getAllOrders,
    getAllListedNFTs,
    getNft,
    getTokenData,
    getOrderData,
    isNFTPutOnSale,
    getNFTowner,
    getUserOrders,
    listNFT,
    unlistNFT,
    buyNFT
  }
}

export async function useContract() {
  if (window.ethereum === null) {
    // 需要告知用户安装metamask
    return {}
  }

  const configureStore = useConfigure();
  if (configureStore.contractMain) return configureStore.contractMain;
  const contractMain = registerContract();
  configureStore.setContractMain(contractMain);

  return contractMain;
}