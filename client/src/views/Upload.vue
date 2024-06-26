<template>
  <div class="flex w-full p-20 justify-center">
    <div class="flex justify-center w-[888px]">
      <div class="p-6">
        <img class="w-[400px] h-[400px]" src="https://p3-pc.douyinpic.com/img/310ed00020f28640b2d8c~c5_300x300.jpeg?from=2956013662" alt="">
      </div>
      <div class="p-10 grow flex flex-col items-center">
        <el-form v-if="step === 1" :model="form" label-width="auto" label-position="top">
          <el-form-item label="请输入图片URL" class="mb-10 mt-8">
            <el-input
              v-model="form.imageUrl"
              style="width: 240px"
              :rows="2"
              type="textarea"
              placeholder="请输入图片URL"
            />
          </el-form-item>
          <el-form-item label="请输入IPFS音乐URL" class="mb-10 mt-8">
            <el-input
              v-model="form.musicUrl"
              style="width: 240px"
              :rows="2"
              type="textarea"
              placeholder="请输入IPFS音乐URL"
            />
          </el-form-item>
          <el-form-item>
            <el-button size="large">图片预览</el-button>
            <el-button size="large" @click="step = 2">铸造</el-button>
          </el-form-item>
        </el-form>
        <el-form v-if="step === 2" :model="form" label-width="auto" label-position="top">
          <el-form-item label="NFT ID" class="mb-10 mt-10">
            <div class="text-3xl">1232</div>
          </el-form-item>
          <el-form-item label="请输入出售价格" class="mb-10 mt-10">
            <div class="flex">
              <el-input
                class="w-[200px]"
                v-model="textarea"
                :rows="2"
                size="large"
                placeholder="Please input"
              />
              <el-select
                class="w-[100px]"
                v-model="value"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="large">上架</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const step = ref(1)
const form = ref({
  imageUrl: '',
  musicUrl: ''
});

const value = ref('')

const options = ref([
  {
    value: 'ETH',
    label: 'ETH',
  }
])
</script>