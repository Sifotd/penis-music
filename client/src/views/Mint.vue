<template>
  <div class="flex w-full p-20 justify-center">
    <div class="flex justify-center w-[1000px]">
      <div class="p-6">
        <el-image
          class="w-[400px] h-[400px]"
          :src="imageUrl"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[imageUrl]"
          :initial-index="4"
          fit="cover"
        />
      </div>
      <div class="p-10 flex-grow flex-col items-center">
        <el-form v-if="step === 1" :model="form" label-position="top">
          <el-form-item label="请选择需要上传的音乐" class="mb-6">
            <!-- <el-input
              v-model="form.imageUrl"
              style="width: 240px"
              :rows="2"
              type="textarea"
              placeholder="请输入图片URL"
            /> -->
            <el-upload
              class="w-[360px]"
              drag
              :before-upload="beforeUpload"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                拖拽到这里或<em>点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  上传文件格式要求：mp3/wav
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-tooltip
              class="box-item"
              effect="dark"
              :disabled="!disabled"
              content="请先上传音乐文件"
              placement="top"
            >
              <el-button :disabled="disabled"  @click="mint" size="large">铸造</el-button>
            </el-tooltip>
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
import { UploadFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useContract } from '@/api/contract';
import { ElMessage, ElMessageBox } from 'element-plus';

const step = ref(1)
const disabled = ref(false)
const router = useRouter();
// const contract = await useContract();

// console.log('contract', contract);
const imageUrl = ref('https://p3-pc.douyinpic.com/img/310ed00020f28640b2d8c~c5_300x300.jpeg?from=2956013662')

const mint = async () => {
  // TODO 铸造 NFT
  const contract = await useContract();
  const result = await contract.mint('test url');

   ElMessageBox.confirm(
    '是否跳转到订单页面？',
    '跳转提示',
    {
      confirmButtonText: '跳转',
      cancelButtonText: '继续铸币',
      type: 'info',
    }
  )
    .then(() => {
      router.push('/singer')
    })
    .catch(() => {
      // TODO 重制当前页面状态
      disabled.value = true;
    })
}

const validateMusic = (file) => {
  const isMusic = file.type === 'audio/mp3' || file.type === 'audio/wav';
  if (!isMusic) {
    ElMessage({
      type: 'error',
      message: '上传音乐文件只能是 mp3/wav 格式!',
    });
  }
  return isMusic;
}

const beforeUpload = (rawFile) => {
  console.log('rawFile', rawFile);
  return validateMusic(rawFile);
}

const value = ref('')

const options = ref([
  {
    value: 'ETH',
    label: 'ETH',
  }
])
</script>