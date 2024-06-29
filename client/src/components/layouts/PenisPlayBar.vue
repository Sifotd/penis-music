<template>
  <div class="play-bar" :class="{ show: !toggle }">
    <div class="fold" :class="{ turn: toggle }">
      <penis-icon :icon="iconList.ZHEDIE" @click="toggle = !toggle"></penis-icon>
    </div>
    <!--播放进度-->
    <el-slider class="progress" v-model="nowTime" @change="changeTime" size="small"></el-slider>
    <div class="control-box">
      <div class="info-box">
        <!--歌曲图片-->
      <div @click="goPlayerPage">
         <el-image class="song-bar-img" fit="contain"/>
      </div>
        <!--播放开始结束时间-->
        <div v-if="songStore.songId">
          <div class="song-info">{{ songStore.songTitle }} - {{ songStore.singerName }}</div>
          <div class="time-info">{{ startTime }} / {{ endTime }}</div>
        </div>
      </div>
      <div class="song-ctr">
        <penis-icon class="penis-play-show" :icon="playStateList[playStateIndex]" @click="changePlayState"></penis-icon>
        <!--上一首-->
        <penis-icon class="penis-play-show" :icon="iconList.SHANGYISHOU" @click="prev"></penis-icon>
        <!--播放-->
        <penis-icon :icon="songStore.playBtnIcon" @click="togglePlay"></penis-icon>
        <!--下一首-->
        <penis-icon class="penis-play-show" :icon="iconList.XIAYISHOU" @click="next"></penis-icon>
        <!--音量-->
        <el-dropdown class="penis-play-show" trigger="click">
          <penis-icon v-if="volume !== 0" :icon="iconList.YINLIANG"></penis-icon>
          <penis-icon v-else :icon="iconList.JINGYIN"></penis-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-slider class="penis-slider" style="height: 150px; margin: 10px 0" v-model="volume"
                         :vertical="true"></el-slider>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="song-ctr song-edit">
        <!--收藏-->
        <penis-icon
            class="penis-play-show"
            :class="{ active: isCollection }"
            :icon="isCollection ? iconList.like : iconList.dislike"
            @click="changeCollection"
        ></penis-icon>
        <!--下载-->
        <penis-icon
            class="penis-play-show"
            :icon="iconList.download"
            @click="
            downloadMusic({
              songUrl: songStore.songUrl,
              songName: songStroe.singerName + '-' + songStore.songTitle,
            })
          "
        ></penis-icon>
        <!--歌曲列表-->
        <penis-icon :icon="iconList.LIEBIAO" @click="changeAside"></penis-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, getCurrentInstance, onMounted, ref, watch} from "vue";
import mixin from "@/mixins/mixin";
import PenisIcon from "./PenisIcon.vue";
import {HttpManager} from "@/api";
import {formatSeconds} from "@/utils";
import {Icon, RouterName} from "@/enums";
import { useUser } from '@/store/user'
import { useSong } from '@/store/song'
import { useConfigure } from '@/store/configure'
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance();
const router = useRouter();
const userStore = useUser();
const songStore = useSong();
const configureStore = useConfigure();
const {routerManager, playMusic, checkStatus, downloadMusic} = mixin(router);

const isCollection = ref(false); // 是否收藏

const userIdVO = computed(() => userStore.userId);
const songIdVO = computed(() => songStore.songId);
const token = computed(() => configureStore.token);

watch(songIdVO, () => {
  initCollection();
});
watch(token, (value?: string) => {
  if (!value) isCollection.value = false;
});

async function initCollection() {
  if (!checkStatus(false)) return;

  const userId = userIdVO.value;
  const type = '0';
  const songId = songIdVO.value;
  isCollection.value = ((await HttpManager.isCollection({userId, type, songId})) as ResponseBody).data;
}

async function changeCollection() {
  if (!checkStatus()) return;

  const userId = userIdVO.value;
  const type = '0'; //这里要看看 不能直接写死
  const songId = songIdVO.value;

  const result = isCollection.value
      ? ((await HttpManager.deleteCollection(userIdVO.value, songIdVO.value)) as ResponseBody)
      : ((await HttpManager.setCollection({userId, type, songId})) as ResponseBody);
  (proxy as any).$message({
    message: result.message,
    type: result.type,
  });

  if (result.data == true || result.data == false) isCollection.value = result.data;
}

onMounted(() => {
  if (songIdVO.value) initCollection();
});

const startTime = ref("00:00");
const endTime = ref("00:00");
const nowTime = ref(0); // 进度条的位)
const toggle = ref(true);
const volume = ref(50);
const playState = ref(Icon.XUNHUAN);
const playStateList = ref([Icon.XUNHUAN, Icon.LUANXU]);
const playStateIndex = ref(0);

const iconList = ref({
  download: Icon.XIAZAI,
  ZHEDIE: Icon.ZHEDIE,
  SHANGYISHOU: Icon.SHANGYISHOU,
  XIAYISHOU: Icon.XIAYISHOU,
  YINLIANG: Icon.YINLIANG1,
  JINGYIN: Icon.JINGYIN,
  LIEBIAO: Icon.LIEBIAO,
  dislike: Icon.Dislike,
  like: Icon.Like,
});

const changeAside = () => {
  configureStore.setShowAside(!configureStore.showAside)
}
// 控制音乐播放 / 暂停
const togglePlay = () => {
  songStore.setIsPlay(!songStore.isPlay)
}

const changeTime = () => {
  songStore.setChangeTime(songStore.duration * (nowTime.value * 0.01))
}

watch(() => songStore.isPlay, (value: boolean) => {
  songStore.setPlayBtnIcon(value ? Icon.ZANTING : Icon.BOFANG)
})
watch(volume, () => {
  songStore.setVolume(volume.value / 100)
})
watch(() => songStore.curTime, () => {
  startTime.value = formatSeconds(songStore.curTime);
  endTime.value = formatSeconds(songStore.duration);
  // 移动进度条
  nowTime.value = (songStore.curTime / songStore.duration) * 100;
})
const changePlayState = () => {
  playStateIndex.value = playStateIndex.value >= playStateList.value.length - 1 ? 0 : ++playStateIndex.value;
  playState.value = playStateList.value[playStateIndex.value];
}
// 上一首
const prev = () => {
  if (playState.value === Icon.LUANXU) {
    let playIndex = Math.floor(Math.random() * songStore.currentPlayList.length);
    playIndex = playIndex === songStore.currentPlayIndex ? playIndex + 1 : playIndex;
    songStore.setCurrentPlayIndex(playIndex)
    toPlay(songStore.currentPlayList[playIndex].url);
  } else if (songStore.currentPlayIndex !== -1 && songStore.currentPlayList.length > 1) {
    if (songStore.currentPlayIndex > 0) {
      songStore.setCurrentPlayIndex(songStore.currentPlayIndex - 1)
      toPlay(songStore.currentPlayList[songStore.currentPlayIndex].url);
    } else {
      songStore.setCurrentPlayIndex(songStore.currentPlayList.length - 1)
      toPlay(songStore.currentPlayList[songStore.currentPlayIndex].url);
    }
  }
}
// 下一首
const next = () => {
  if (playState.value === Icon.LUANXU) {
    let playIndex = Math.floor(Math.random() * songStore.currentPlayList.length);
    playIndex = playIndex === songStore.currentPlayIndex ? playIndex + 1 : playIndex;
    songStore.setCurrentPlayIndex(playIndex)
    toPlay(songStore.currentPlayList[playIndex].url);
  } else if (songStore.currentPlayIndex !== -1 && songStore.currentPlayList.length > 1) {
    if (songStore.currentPlayIndex < songStore.currentPlayList.length - 1) {
      songStore.setCurrentPlayIndex(songStore.currentPlayIndex + 1)
      toPlay(songStore.currentPlayList[songStore.currentPlayIndex].url);
    } else {
      songStore.setCurrentPlayIndex(0)
      toPlay(songStore.currentPlayList[0].url);
    }
  }
}
// 选中播放
const toPlay = (url: string) => {
  if (url && url !== songStore.songUrl) {
    const song = songStore.currentPlayList[songStore.currentPlayIndex];
    playMusic({
      id: song.id,
      url,
      pic: song.pic,
      index: songStore.currentPlayIndex,
      name: song.name,
      lyric: song.lyric,
      currentSongList: songStore.currentPlayList,
    });
  }
}
const goPlayerPage = () => {
  routerManager(RouterName.Lyric, {path: `${RouterName.Lyric}/${songStore.songId}`});
}

watch(() => songStore.autoNext, () => { 
  next();
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/penis-play-bar.scss";
</style>
