import { defineStore } from 'pinia'
import { Icon } from "@/enums";
export const useSong = defineStore('song', {
  state: () => {
    return {
      /** 音乐信息 */
      songId: "", // 音乐 ID
      songTitle: "", // 歌名
      songUrl: "", // 音乐 URL
      songPic: `/img/songPic/tubiao.jpg`, // 歌曲图片
      singerName: "", //  歌手名
      lyric: [], // 处理后的歌词数据

      /** 音乐播放信息 */
      isPlay: false, // 播放状态
      playBtnIcon: Icon.BOFANG, // 播放状态的图标
      volume: 0, // 音量
      duration: 0, // 音乐时长
      curTime: 0, // 当前音乐的播放位置
      changeTime: 0, // 指定播放时刻
      autoNext: true, // 用于触发自动播放下一首

      /** 音乐列表信息 */
      currentPlayList: [], // 当前播放列表
      songDetails: null, // 单个歌单信息
      currentPlayIndex: -1, // 当前歌曲在歌曲列表的位置
    }
  },
  actions: {
    setSongId(songId) {
      this.songId = songId;
    },
    setSongTitle(songTitle) {
      this.songTitle = songTitle;
    },
    setSongUrl(songUrl) {
      this.songUrl = songUrl;
    },
    setSongPic(songPic) {
      this.songPic = songPic;
    },
    set(singerName) {
      this.singerName = singerName;
    },
    setAutoNext(autoNext) {
      this.autoNext = autoNext;
    },
    setLyric(lyric) {
      this.lyric = lyric;
    },

    setIsPlay(isPlay) {
      this.isPlay = isPlay;
    },
    setPlayBtnIcon(playBtnIcon) {
      this.playBtnIcon = playBtnIcon;
    },
    setVolume(volume) {
      this.volume = volume;
    },
    setDuration(duration) {
      this.duration = duration;
    },
    setCurTime(curTime) {
      this.curTime = curTime;
    },
    setChangeTime(changeTime) {
      this.changeTime = changeTime;
    },
    setCurrentPlayList(currentPlayList) {
      this.currentPlayList = currentPlayList;
    },
    setSongDetails(songDetails) {
      this.songDetails = songDetails;
    },
    setCurrentPlayIndex(currentPlayIndex) {
      this.currentPlayIndex = currentPlayIndex;
    },
    playMusic: ({ id, url, pic, index, songTitle, singerName, lyric, currentSongList }) => {
      this.setSongId(id);
      this.setSongUrl(url);
      this.setSongPic(pic);
      this.setCurrentPlayIndex(index);
      this.setSongTitle(songTitle);
      this.setSingerName(singerName);
      this.setLyric(lyric);
      this.setCurrentPlayList(currentSongList);
    }
  }
})
