<template>
  <div class="flex w-full p-20 justify-center">
    <div class="flex justify-center w-[888px]">
      <div class="p-6">
        <img class="w-[400px] h-[400px]" :src="nft.imageUrl" alt="">
      </div>
      <div class="p-10 grow flex flex-col items-center">
        <el-form ref="formRef" :model="formData" label-width="auto" label-position="top">
          <el-form-item label-position="left" label="" class="mb-10 mt-10">
            NFT ID:  {{ nft.id }}
          </el-form-item>
          <el-form-item 
            prop="price"
            :rules="[
              { required: true, message: '价格不能为空' },
              { validator: validatePrice}
            ]"
            label="请输入出售价格" class="mb-10 mt-10">
            <div class="flex">
              <el-input
                class="w-[200px]"
                v-model="formData.price"
                size="large"
                placeholder="Please input"
              >
              <template v-slot:prefix>
                ETH                 
              </template>
            </el-input>
            </div>
          </el-form-item>
          <el-form-item label="" class="mb-10 mt-10">
            <el-button plain size="large" @click="putOnSale(formRef)">上架</el-button>
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
  id: '',
  imageUrl: ''
});
const router = useRouter();

const formRef = ref<FormInstance>();
const formData = reactive({
  price: 0
});

onMounted(async () => {
  const contract = await useContract();
  const tokenId = route.query.tokenId;
  await contract.getTokenData(tokenId).then((data) => {
    nft.value = data;
  })
})

const validatePrice = (rule, value) => {
  if (isNaN(value)) {
    rule.message = '价格必须是数字';
    return false;
  }
  if (value <= 0) {
    rule.message = '价格必须大于0';
    return false;
  }
  return true;
}

const putOnSale = (formEl: FormInstance | undefined) => { 
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const contract = await useContract();
      const finalPrice = formData.price * 10 ** 18;
      await contract.listNFT(finalPrice, nft.value.id);
      router.push('/');
    }
  });
}
</script>