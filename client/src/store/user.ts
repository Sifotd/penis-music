import { defineStore } from 'pinia'
export const useUser = defineStore('user', {
  state: () => {
    return {
      userId: "", // ID
      username: "", // 名字
      userPic: "", // 图片
    }
  },
  actions: {
    setUserId: (userId) => {
      this.userId = userId;
    },
    setUsername: (username) => {
      this.username = username;
    },
    setUserPic: (userPic) => {
      this.userPic = userPic;
    },
  },
})
