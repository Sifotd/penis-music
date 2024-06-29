import { defineStore } from 'pinia'

export const useConfigure = defineStore('configure', {
  state: () => {
    return {
      token: false, // 用户是否登录
      showAside: false, // 是否显示侧边栏
      searchWord: "", // 搜索关键词
      activeNavName: "", // 导航栏名称
      contractMain: null, // 合约
      wallet: null // 钱包
    }
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setActiveNavName(activeNavName) {
      this.activeNavName = activeNavName;
    },
    setShowAside(showAside) {
      this.showAside = showAside;
    },
    setSearchWord(searchWord) {
      this.searchWord = searchWord;
    },
    setContractMain(contractMain) {
      this.contractMain = contractMain;
    },
    setWallet(wallet) {
      this.wallet = wallet;
    }
  }
})
