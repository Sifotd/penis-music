<template>
  <div class="search">
    <penis-nav :styleList="searchNavList" :activeName="activeName" @click="handleChangeView"></penis-nav>
    <component class="search-list" :is="currentView"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PenisNav from "@/components/layouts/PenisNav.vue";
import SearchSong from "./SearchSong.vue";
import SearchSongList from "./SearchSongList.vue";

export default defineComponent({
  components: {
    PenisNav,
    SearchSong,
    SearchSongList,
  },
  data() {
    return {
      searchNavList: [
        {
          name: "歌曲",
          value: "SearchSong",
        },
        {
          name: "歌单",
          value: "SearchSongList",
        },
      ],
      activeName: "歌曲",
      currentView: "SearchSong",
    };
  },
  methods: {
    handleChangeView(item) {
      this.activeName = item.name;
      this.currentView = item.value;
    },
  },
});
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
