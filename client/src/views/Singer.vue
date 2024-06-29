<template>
  <NFTList class="play-list-container" title="已上架" path="song-sheet-detail" :playList="putOnList"></NFTList>
  <NFTList class="play-list-container" title="未上架" path="song-sheet-detail" :playList="unPutOnList"></NFTList>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import NFTList from "@/components/NFTList.vue";
import { useContract } from "@/api/contract";
import { useConfigure } from "@/store/configure";
import { ElMessage } from 'element-plus';

const putOnList = ref([]); // 已上架
const unPutOnList = ref([]); // 未上架
const configure = useConfigure();

const loadPutOnList = async () => {
  const contract = await useContract();
  const orderList = await contract.getUserOrders(configure.wallet.account);
  putOnList.value = await Promise.all(orderList.map(async (orderId: BigInt) => {
    return await contract.getOrderData(orderId);
  }))
}

const loadUnPutOnList = async () => {
  const contract = await useContract();
  const nftList = await contract.getNft(configure.wallet.account);
  unPutOnList.value = await Promise.all(nftList.map(async (tokenId: BigInt) => {
    return await contract.getTokenData(tokenId)
  }))
}

onMounted(async () => {
  if (!configure.wallet) {
    ElMessage({
      showClose: true,
      message: '请先连接钱包'
    })
    return;
  }
  await loadUnPutOnList();
  await loadPutOnList();
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
