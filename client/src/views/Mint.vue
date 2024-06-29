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
          :initial-index="4"
          fit="cover"
        />
      </div>
      <div class="p-10 flex-grow flex-col items-center">
        <el-form :model="form" label-position="top">
          <el-form-item label="请选择需要上传的音乐" class="mb-6">
            <el-upload
              class="w-[360px]"
              drag
              action="https://api.pinata.cloud/pinning/pinFileToIPFS"
              :http-request="uploadImage"
              :before-upload="beforeUpload"
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
import { HttpManager } from "@/api";
import Config from '@/config';
import axios from 'axios';
import { useConfigure } from '../store/configure';

const attachImageUrl = HttpManager.attachImageUrl;
const disabled = ref(true)
const router = useRouter();

const configureStore = useConfigure();
const imageUrl = ref(attachImageUrl('/bg1.png'))
const musicUrl = ref('')
const mint = async () => {
  
  // TODO 铸造 NFT
  const contract = await useContract();
  await contract.mint(musicUrl.value);

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
  console.log('file', file, Config)
  const isMusic = Config.audioType.includes(file.type);
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

const uploadImage = async (option) => {
  const formData = new FormData();
  formData.append('file', option.file);

  const pinataMetadata = JSON.stringify({
    name: 'music file',
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post(option.action, formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${configureStore.jwt}`
      }
    })
    musicUrl.value = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    disabled.value = false;
  } catch (error) {
    option.onError(error)
  }
}
</script>