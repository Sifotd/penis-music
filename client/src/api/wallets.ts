import { ethers } from "ethers";

const users: any = {}


/**
 * 通过地址获取后端生成的随机数 nonce，用于签名
 * @param address  用户地址
 * @returns {number} 返回随机数 nonce
 *
 * 这个方法充当后台服务，从后台中获取需要签名的数据
 */
function auth(address: string) {
    let user = users[address]
    if (!user) {
        user = {
            address,
            nonce: Math.floor(Math.random() * 10000000)
        }
        users[address] = user
    } else {
        const nonce = Math.floor(Math.random() * 10000000)
        user.nonce = nonce
        users[address] = user
    }
    return user.nonce
}

/**
 * 验证用户签名是否正确
 * @param address   用户地址
 * @param signature 签名数据
 * @returns {boolean} 返回签名是否正确
 *
 * 这个方法充当后台服务，后台验证签名正确后，就返回相关登录态数据，完成登录流程
 */
function verify(address, signature) {
  let signValid = false
  console.log(`address: ${address}`)
  //从数据库中取出nonce
  let nonce = users[address].nonce
  console.log(`nonce: ${nonce}`)
  //验证对nonce进行签名的地址
  const decodedAddress = ethers.verifyMessage(nonce.toString(), signature.toString())
  console.log(`decodedAddress: ${decodedAddress}`)
  //比较地址和签名的地址是否一致
  if (address.toLowerCase() === decodedAddress.toLowerCase()) {
      signValid = true
      //出于安全原因，更改nonce，防止下次直接使用相同的nonce进行登录
      users[address].nonce = Math.floor(Math.random() * 10000000)
  }
  return signValid
}

export async function useWallet() {
  if (!window?.ethereum) {
    alert("please install the metamask wallet!");
    return;
  }
  console.log("连接钱包")
  // 获得provider
  const provider = new ethers.BrowserProvider(window?.ethereum)
  // 读取钱包地址
  const accounts = await provider.send("eth_requestAccounts", []);
  const account = accounts[0]
  // 读取chainid
  const { chainId } = await provider.getNetwork()
  // 读取ETH余额
  const signer = await provider.getSigner()
  const nonce = auth(account);
  const signature = await signer.signMessage(nonce.toString())
  const balance = await provider.getBalance(signer.getAddress());
  const signStatus = verify(account, signature);
  return {
    account, // 钱包地址
    chainId, // chainid
    signature, // 签名
    signStatus, // 签名状态
    balance: ethers.formatUnits(balance) // 以太坊余额
  }
}

