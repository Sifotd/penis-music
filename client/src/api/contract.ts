import { ethers } from "ethers";
import MainConfig from './Main.json';

export async function useContract() {
  const MainAddress = "0x171920C420A6e93EB65F37e072B6D8cA3383Aa9e";
  if (window.ethereum === null) {
    // 需要告知用户安装metamask
    return {}
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner();

  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const account = accounts[0]
  const contractMain = new ethers.Contract(MainAddress, MainConfig, signer);
  console.log('contractMain', contractMain);

  const mint = async (ipfsDownloadUrl: string) => {
    const result = await contractMain.mint(account, ipfsDownloadUrl);
    console.log('result', result);
  }

  return {
    mint
  }
}