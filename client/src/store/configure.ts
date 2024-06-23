import { defineStore } from 'pinia'
export const useConfigure = defineStore('configure', {
  state: () => {
    return {
      token: false, // 用户是否登录
      showAside: false, // 是否显示侧边栏
      searchWord: "", // 搜索关键词
      activeNavName: "", // 导航栏名称
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
  }
})
