import { defineStore } from 'pinia'

export const useConfigure = defineStore('configure', {
  state: () => {
    return {
      token: false, // 用户是否登录
      showAside: false, // 是否显示侧边栏
      searchWord: "", // 搜索关键词
      activeNavName: "", // 导航栏名称
      contractMain: null, // 合约
      wallet: null, // 钱包,
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NmQ5M2E5NC0yOGUxLTQzZTYtODNhYi0wYmQwY2RmOWQxNjAiLCJlbWFpbCI6ImJydXRhbDE5Mzk5MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOThkNjA5OTYzMDc3NWY0MTY1NmIiLCJzY29wZWRLZXlTZWNyZXQiOiIyMDJhNWJlNmU2NGU3ZTkwNGQ5ZDQyMmJlMjA5MTI1MjkxYTU4ZWNmNzY3MDBhMGE5MjdlYjY0MGExN2Y0MzY0IiwiaWF0IjoxNzE5NjQ5NjQ0fQ.GK5-Bx_33ou4nqpZyF9m-F8E_2bGgFU5-u2BB4QhH5A',
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
