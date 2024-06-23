<template>
  <transition name="aside-fade">
    <div class="penis-current-play" v-if="showAside">
      <h2 class="title">当前播放</h2>
      <div class="control">共 {{ (currentPlayList && currentPlayList.length) || 0 }} 首</div>
      <ul class="menus">
        <li
          v-for="(item, index) in currentPlayList"
          :class="{ 'is-play': songId === item.id }"
          :key="index"
          @click="playMusic({
            id: item.id,
            url: item.url,
            pic: item.pic,
            index: index,
            name: item.name,
            lyric: item.lyric,
            currentSongList: currentPlayList,
          })">
          {{ getSongTitle(item.name) }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useSong } from '@/store/song'
import { useConfigure } from '@/store/configure'
import mixin from "@/mixins/mixin";

export default defineComponent({
  setup() {
    const songStore = useSong();
    const configureStore = useConfigure();
    const { getSongTitle, playMusic } = mixin();

    const songId = computed(() => songStore.songId); // 音乐 ID
    const currentPlayList = computed(() => songStore.currentPlayList); // 当前播放
    const showAside = computed(() => configureStore.showAside); // 是否显示侧边栏

    onMounted(() => {
      document.addEventListener('click', () => {
        configureStore.setShowAside(false)
      }, true)
    })

    return {
      songId,
      currentPlayList,
      showAside,
      getSongTitle,
      playMusic,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/penis-current-play.scss";
</style>
