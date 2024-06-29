<template>
  <NFTList class="play-list-container" title="已上架" path="song-sheet-detail" :playList="putOnList"></NFTList>
  <NFTList class="play-list-container" title="未上架" path="song-sheet-detail" :playList="unPutOnList"></NFTList>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import NFTList from "@/components/NFTList.vue";
import { HttpManager } from "@/api/mock";

const putOnList = ref([]); // 已上架
const unPutOnList = ref([]); // 未上架
try {
  HttpManager.getSongList().then((res) => {
    putOnList.value = (res as ResponseBody).data.sort().slice(0, 10);
    unPutOnList.value = (res as ResponseBody).data.sort().slice(0, 10);
  });
} catch (error) {
  console.error(error);
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

/*轮播图*/
.swiper-container {
  width: 90%;
  margin: auto;
  padding-top: 20px;
  img {
    width: 100%;
  }
}

.swiper-container:deep(.el-carousel__indicators.el-carousel__indicators--outside) {
  display: inline-block;
  transform: translateX(30vw);
}

.el-slider__runway {
  background-color: $color-blue;
}
</style>
