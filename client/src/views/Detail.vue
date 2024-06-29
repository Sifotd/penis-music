<template>
  <div class="flex w-full p-20 justify-center">
    <div class="flex justify-center w-[888px]">
      <div class="p-6">
        <img class="w-[400px] h-[400px]" :src="nft.imageUrl" alt="">
      </div>
      <div class="p-10 grow flex flex-col items-center">
        <div class="text-3xl m-10">NFT ID: {{ nft.tokenId }}</div>
        <div class="text-3xl m-10">Price: 0.06ETH</div>
        <div class="m-10">
          <el-button plain class="text-3xl p-8" size="large">购买</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useContract } from "@/api/contract";

const route = useRoute();
const nft = ref({
  tokenId: '',
  imageUrl: ''
});

onMounted(async () => {
  const contract = await useContract();
  const tokenId = route.query.tokenId;
  await contract.getTokenData(tokenId).then((data) => {
    nft.value = data;
  })
  const isNFTPutOnSale = await contract.isNFTPutOnSale(tokenId);
})
</script>