import { ethers } from "ethers";
import { useConfigure } from '@/store/configure'
import MainConfig from './Main.json';

async function registerContract() {
  const MainAddress = "0xf48090b59e55BA91854d4Ad4E4C73C63eEf1259A";
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
    const result = await contractMain.getAllOrders();
    console.log('allOrders', result);
  }

  const getNft = async (address: string) => { 
    return await contractMain.getNft(address);
  }

  const getTokenData = async (tokenId: number) => {
    const tokenData = await contractMain.getTokenData(tokenId);
    const response = await fetch(tokenData[1]);
    const imageData = await response.json();
    return {
      tokenId,
      musicUrl: tokenData[0],
      imageUrl: imageData.image
    }
  }

  return {
    mint,
    getAllOrders,
    getNft,
    getTokenData
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