<template>
  <div class="search">
    <penis-nav :styleList="searchNavList" :activeName="activeName" @click="handleChangeView"></penis-nav>
    <component class="search-list" :is="currentView"></component>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PenisNav from "@/components/layouts/PenisNav.vue";
import SearchSong from "./SearchSong.vue";
import SearchSongList from "./SearchSongList.vue";

const searchNavList = ref([
  {
    name: "歌曲",
    value: "SearchSong",
    component: SearchSong
  },
  {
    name: "歌单",
    value: "SearchSongList",
    component: SearchSongList
  },
]);
const activeName = ref("歌曲");
const currentView = ref(SearchSong)

const handleChangeView = (item: any) => {
  activeName.value = item.name;
  currentView.value = item.component;
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.search {
  margin: auto;
  width: 900px;
  
  .search-list {
    min-height: 480px;
  }
}
</style>
