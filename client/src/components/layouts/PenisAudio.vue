<template>
  <audio :src="attachImageUrl(songUrl)" controls="controls" :ref="player" preload="true" @canplay="canplay" @timeupdate="timeupdate" @ended="ended">
    <!--（1）属性：controls，preload（2）事件：canplay，timeupdate，ended（3）方法：play()，pause() -->
    <!--controls：向用户显示音频控件（播放/暂停/进度条/音量）-->
    <!--preload：属性规定是否在页面加载后载入音频-->
    <!--canplay：当音频/视频处于加载过程中时，会发生的事件-->
    <!--timeupdate：当目前的播放位置已更改时-->
    <!--ended：当目前的播放列表已结束时-->
  </audio>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useSong } from "@/store/song";
import { HttpManager } from "@/api";

const attachImageUrl = HttpManager.attachImageUrl;
const songStore = useSong();
const divRef = ref<HTMLAudioElement>();
const player = (el) => {
  divRef.value = el;
};

  const muted = ref(true); // 添加一个 reactive 的 muted 属性

const audioDom = document.querySelector('audio');
if (audioDom) {
  // 设置为静音并尝试自动播放
  audioDom.muted = true;
  audioDom.play()
    .then(() => {
      // 自动播放成功
    })
    .catch(error => {
      // 自动播放失败，可能是因为没有用户交互
      console.error('自动播放失败，需要用户交互。', error);
    });
}


const songUrl = computed(() => 'music.mp3'); // 音乐链接
const isPlay = computed(() => songStore.isPlay); // 播放状态
const volume = computed(() => songStore.volume); // 音量
const changeTime = computed(() => songStore.changeTime); // 指定播放时刻
const autoNext = computed(() => songStore.autoNext); // 用于触发自动播放下一首
// 监听播放还是暂停
watch(isPlay, () => togglePlay());
// 跳到指定时刻播放
watch(changeTime, () => (divRef.value.currentTime = changeTime.value));
watch(volume, (value) => (divRef.value.volume = value));

// 开始 / 暂停
function togglePlay() {
  isPlay.value ? divRef.value.play() : divRef.value.pause();
}
// 获取歌曲链接后准备播放
function canplay() {
  //  记录音乐时长
  songStore.setDuration(divRef.value.duration);
  //  开始播放
  if (muted.value) {
    divRef.value.muted = false;
    muted.value = false;
  }
  // divRef.value.play();
  songStore.setIsPlay(true);
}
// 音乐播放时记录音乐的播放位置
function timeupdate() {
  songStore.setCurTime(divRef.value.currentTime);
}
// 音乐播放结束时触发
function ended() {
  songStore.setIsPlay(false);
  songStore.setCurTime(0);
  songStore.setAutoNext(!autoNext.value);
}
</script>

<style scoped>
audio {
  display: none;
}
</style>
