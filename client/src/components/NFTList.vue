<template>
  <el-divider content-position="left">{{ props.title }}</el-divider>
  <div class="play-list">
    <ul class="play-body mt-8">
      <li class="card-frame" v-for="(item, index) in playList" :key="index">
        <div class="card" @click="playMusic(item)">
          <el-image class="card-img" fit="contain" :src="item.imageUrl" />
          <div class="mask">
            <penis-icon class="mask-icon" :icon="BOFANG"></penis-icon>
          </div>
        </div>
        <div class="mt-1 text-sm">NFTID：{{ item.tokenId }}</div>
        <div class="flex justify-between">
          <div class="mt-1 text-xs">价格：{{ item.price || '未上架'}}</div>
          <div class="mt-1 cursor-pointer text-blue-300 text-xs" @click="jumpToDetail(item.id)">详情 ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PenisIcon from "@/components/layouts/PenisIcon.vue";
import { Icon } from "@/enums";
import { useRouter } from "vue-router";
const props = defineProps({
  title: String,
  playList: Array,
  path: String
})

const BOFANG = ref(Icon.BOFANG)

const router = useRouter();

const jumpToDetail = (id: String) => {
  router.push(`/detail?id=${id.toString()}`)
}

const playMusic = () => {
  console.log('play music')
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.play-list {
  padding: 0 1rem;

  .play-title {
    height: 60px;
    line-height: 60px;
    font-size: 28px;
    font-weight: 500;
    text-align: center;
    color: $color-black;
    box-sizing: border-box;
  }

  .play-body {
    @include layout(flex-start, stretch, row, wrap);
  }
}

.card-frame {
  .card {
    position: relative;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    border-radius: 5px;

    .card-img {
      width: 100%;
      transition: all 0.4s ease;
    }
  }

  .card-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin: 0.5rem 0;
  }

  &:hover .card-img {
    transform: scale(1.2);
  }
}

.mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  background-color: rgba(52, 47, 41, 0.4);
  @include layout(center, center);
  transition: all 0.3s ease-in-out;
  opacity: 0;

  .mask-icon {
    @include icon(2em, rgba(240, 240, 240, 1));
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.card-frame {
  box-shadow: 3px 3px 3px rgba(200, 200, 200, .3);
  border: 1px solid rgba(200, 200, 200, .3);
  border-radius: 5px;
  padding: 5px;
}

@media screen and (min-width: $sm) {
  .card-frame {
    width: 18%;
    margin: 0.5rem 1%;
  }
}

@media screen and (max-width: $sm) {
  .card-frame {
    width: 46%;
    margin: 0.5rem 2%;
  }
}
</style>
