<template>
  <!--轮播图-->
  <div class="flex items-center justify-center">
    <div class="w-[800px]">
      <el-carousel class="swiper-container" type="card" height="400px" :interval="4000">
        <el-carousel-item v-for="(item, index) in swiperList" :key="index">
          <img :src="item.imageUrl" @click="jumpToDetail(item)"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
 
  <!--热门-->
  <play-list class="play-list-container" title="歌单" path="song-sheet-detail" :playList="songList"></play-list>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import PlayList from "@/components/PlayList.vue";
import { useContract } from "@/api/contract";
import { useRouter } from "vue-router";

const router = useRouter();
const songList = ref([]); // 歌单列表
const swiperList = ref([]);// 轮播图 每次都在进行查询

const jumpToDetail = (item: any) => {
  router.push('/detail?orderId=' + item.orderId);
}

onMounted(async () => {
  const constract = await useContract();
  const orders = await constract.getAllOrders();
  swiperList.value = orders.slice(0, 4);
  songList.value = orders;
});
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
