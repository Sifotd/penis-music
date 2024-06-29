<template>
  <router-view />
</template>
<script setup lang="ts">
import {  onMounted } from 'vue';
import { useContract } from '@/api/contract';

onMounted(() => {
  useContract();
})
</script>