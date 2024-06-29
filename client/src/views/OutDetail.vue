<template>
  <div class="flex w-full p-20 justify-center">
    <div class="flex justify-center w-[888px]">
      <div class="p-6">
        <img class="w-[400px] h-[400px]" :src="nft.imageUrl" alt="">
      </div>
      <div class="p-10 grow flex flex-col items-center">
        <el-form label-width="auto">
          <el-form-item label="" class="mb-10 mt-10">
            NFT ID：{{ nft.id }}
          </el-form-item>
          <el-form-item label="" class="mb-10 mt-10">
            价格：{{ nft.price }} ETH
          </el-form-item>
          <el-form-item label="" class="mb-10 mt-10">
            <el-button plain size="large" @click="putOffSale()">下架</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useContract } from "@/api/contract";
import type { FormInstance } from 'element-plus'

const route = useRoute();
const nft = ref({
  tokenId: '',
  imageUrl: ''
});
const router = useRouter();


onMounted(async () => {
  const contract = await useContract();
  const orderId = route.query.orderId;
  await contract.getOrderData(orderId).then((data) => {
    nft.value = data;
  })
})


const putOffSale = async () => { 
  const contract = await useContract();
  await contract.unlistNFT(nft.value.orderId);
  router.push('/');
}
</script>