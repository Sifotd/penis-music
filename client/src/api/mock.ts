import { getBaseURL, get, post, deletes } from "./request";

const HttpManager = {
  // 获取图片信息
  attachImageUrl: (url) => url ? `${getBaseURL()}/${url}` : "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png",
  // =======================> 用户 API 完成
  // 登录
  signIn: ({username,password}) => post(`user/login/status`, {username,password}),
  signInByemail: ({email,password})=>post(`user/email/status`, {email,password}),
  // 注册
  SignUp: ({username,password,sex,phoneNum,email,birth,introduction,location}) => post(`user/add`, {username,password,sex,phoneNum,email,birth,introduction,location}),
  // 删除用户
  deleteUser: (id) => get(`user/delete?id=${id}`),
  // 更新用户信息
  updateUserMsg: ({id,username,sex,phoneNum,email,birth,introduction,location}) => post(`user/update`, {id,username,sex,phoneNum,email,birth,introduction,location}),
  updateUserPassword: ({id,username,oldPassword,password}) => post(`user/updatePassword`, {id,username,oldPassword,password}),
  // 返回指定ID的用户
  getUserOfId: (id) => get(`user/detail?id=${id}`),

  // =======================> 歌单 API 完成
  // 获取全部歌单
  getSongList: () => Promise.resolve({
    data: [
      {
        id: 1,
        name: '休闲',
        title: 'music for you',
        price: '7.45EDU',
        pic: 'https://img10.360buyimg.com/n1/jfs/t1/95339/37/34774/160282/64c913c9Fed894541/d16c13ccc4dd7e21.jpg'
      },
      {
        id: 2,
        name: '蓝调',
        title: 'music for you',
        price: '2.44EDU',
        pic: 'https://wx3.sinaimg.cn/mw690/006ebK81ly1hpey1zeknzj32c03404qp.jpg'
      },
      {
        id: 3,
        name: '乡村',
        title: 'music for you',
        price: '9.35EDU',
        pic: 'https://img2.baidu.com/it/u=2941341201,1677713469&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750'
      },
      {
        id: 4,
        name: '民谣',
        title: 'music for you',
        price: '5.25EDU',
        pic: 'https://p3-pc.douyinpic.com/img/310ed00020f28640b2d8c~c5_300x300.jpeg?from=2956013662'
      },
      {
        id: 5,
        name: '民谣',
        title: 'music for you',
        price: '5.25EDU',
        pic: 'https://p3-pc.douyinpic.com/img/310ed00020f28640b2d8c~c5_300x300.jpeg?from=2956013662'
      }
    ]
  }),
  // 获取歌单类型
  getSongListOfStyle: (style) => get(`songList/style/detail?style=${style}`),
  // 返回标题包含文字的歌单
  getSongListOfLikeTitle: (keywords) => get(`songList/likeTitle/detail?title=${keywords}`),
  // 返回歌单里指定歌单ID的歌曲
  getListSongOfSongId: (songListId) => get(`listSong/detail?songListId=${songListId}`),

  // =======================> 歌手 API  完成
  // 返回所有歌手
  getAllSinger: () => Promise.resolve({data:[]}),
  // 通过性别对歌手分类
  getSingerOfSex: (sex) => get(`singer/sex/detail?sex=${sex}`),

  // =======================> 收藏 API 完成
  // 返回的指定用户ID的收藏列表
  getCollectionOfUser: (userId) => get(`collection/detail?userId=${userId}`),
  // 添加收藏的歌曲 type: 0 代表歌曲， 1 代表歌单
  setCollection: ({userId,type,songId}) => post(`collection/add`,{userId,type,songId}),

  deleteCollection: (userId, songId) => deletes(`collection/delete?userId=${userId}&&songId=${songId}`),

  isCollection: ({userId, type, songId}) => post(`collection/status`, {userId, type, songId}),

  // =======================> 评分 API 完成
  // 提交评分
  setRank: ({songListId,consumerId,score}) => post(`rankList/add`, {songListId,consumerId,score}),
  // 获取指定歌单的评分
  getRankOfSongListId: (songListId) => get(`rankList?songListId=${songListId}`),
  // 获取指定用户的歌单评分
  getUserRank: (consumerId, songListId) => get(`/rankList/user?consumerId=${consumerId}&songListId=${songListId}`),

  // =======================> 评论 API 完成
  // 添加评论
  setComment: ({userId,content,songId,songListId,nowType}) => post(`comment/add`, {userId,content,songId,songListId,nowType}),
  // 删除评论
  deleteComment: (id) => get(`comment/delete?id=${id}`),
  // 点赞
  setSupport: ({id,up}) => post(`comment/like`, {id,up}),
  // 返回所有评论
  getAllComment: (type, id) => {
    let url = "";
    if (type === 1) {
      url = `comment/songList/detail?songListId=${id}`;
    } else if (type === 0) {
      url = `comment/song/detail?songId=${id}`;
    }
    return get(url);
  },

  // =======================> 歌曲 API
  // 返回指定歌曲ID的歌曲
  getSongOfId: (id) => get(`song/detail?id=${id}`),
  // 返回指定歌手ID的歌曲
  getSongOfSingerId: (id) => get(`song/singer/detail?singerId=${id}`),
  // 返回指定歌手名的歌曲
  getSongOfSingerName: (keywords) => get(`song/singerName/detail?name=${keywords}`),
  // 下载音乐
  downloadMusic: (url) => get(url, { responseType: "blob" }),

  //======================> 点赞api的优化 避免有些是重复的点赞！新增数据表了得

  testAlreadySupport:({commentId,userId}) => post(`userSupport/test`, {commentId,userId}),

  deleteUserSupport:({commentId,userId}) => post(`userSupport/delete`, {commentId,userId}),

  insertUserSupport:({commentId,userId}) => post(`userSupport/insert`, {commentId,userId}),

  //获取所有的海报
  getBannerList: () => Promise.resolve({data:[]})
};



export { HttpManager };
