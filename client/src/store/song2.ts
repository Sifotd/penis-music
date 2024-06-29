import { defineStore } from 'pinia'
import { Icon } from "@/enums";
import { ref } from 'vue';
export const useSong = defineStore('song', () => {
  const songId = ref('');
  const setSongId = (_songId: string) => {
    songId.value = _songId;
  }
  const songTitle = ref(''); // 歌名
  const setSongTitle = (_songTitle: string) => {
    songTitle.value = _songTitle;
  }

  const songUrl = ref(''); // 音乐 URL
  const setSongUrl = (_songUrl: string) => {
    songUrl.value = _songUrl;
  }

  const songPic = ref(`/img/songPic/tubiao.jpg`); // 歌曲图片
  const setSongPic = (_songPic: string) => {
    songPic.value = _songPic;
  }

  const singerName = ref(""); //  歌手名
  const setSingerName = (_singerName: string) => {
    singerName.value = _singerName;
  }
  const lyric = ref([]); // 处理后的歌词数据
  const setLyric = (_lyric: []) => {
    lyric.value = _lyric;
  }
  const isPlay = ref(false); // 播放状态
  const setIsPlay = (_isPlay: boolean) => {
    isPlay.value = _isPlay;
  }
  const playBtnIcon = ref(Icon.BOFANG); // 播放状态的图标
  const setPlayBtnIcon = (_playBtnIcon: Icon) => {
    playBtnIcon.value = _playBtnIcon;
  }
  const volume = ref(0); // 音量
  const setVolume = (_volume: number) => {
    volume.value = _volume;
  }
  const duration = ref(0); // 音乐时长
  const setDuration = (_duration: number) => {
    duration.value = _duration;
  }
  const curTime = ref(0); // 当前音乐的播放位置
  const setCurTime = (_curTime: number) => {
    curTime.value = _curTime;
  }
  const changeTime = ref(0); // 指定播放时刻
  const setChangeTime = (_changeTime: number) => {
    changeTime.value = _changeTime;
  }
  const autoNext = ref(false); // 用于触发自动播放下一首
  const setAutoNext = (_autoNext: boolean) => {
    autoNext.value = _autoNext;
  }
  const currentPlayList = ref([]); // 当前播放列表
  const setCurrentPlayList = (_currentPlayList: []) => {
    currentPlayList.value = _currentPlayList;
  }
  const songDetails = ref(null); // 单个歌单信息
  const setSongDetails = (_songDetails: any) => {
    songDetails.value = _songDetails;
  }
  const currentPlayIndex = ref(-1); // 当前歌曲在歌曲列表的位置
  const setCurrentPlayIndex = (_currentPlayIndex: number) => {
    currentPlayIndex.value = _currentPlayIndex;
  }

  const playMusic = ({ id, url, pic, index, songTitle, singerName, lyric, currentSongList }) => {
    songId.value = id;
    songUrl.value = url;
    songPic.value = pic;
    currentPlayIndex.value = index;
  }

  return {
    songId,
    setSongId,
    songTitle,
    setSongTitle,
    songUrl,
    setSongUrl,
    songPic,
    setSongPic,
    singerName,
    setSingerName,
    lyric,
    setLyric,
    isPlay,
    setIsPlay,
    playBtnIcon,
    setPlayBtnIcon,
    volume,
    setVolume,
    duration,
    setDuration,
    curTime,
    setCurTime,
    changeTime,
    setChangeTime,
    autoNext,
    setAutoNext,
    currentPlayList,
    setCurrentPlayList,
    songDetails,
    setSongDetails,
    currentPlayIndex,
    setCurrentPlayIndex,
    playMusic
  }
})
