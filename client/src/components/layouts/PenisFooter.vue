<template>
  <div class="penis-footer">
    <p v-for="(item, index) in footerList" :key="index">
      {{ item }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { readonly } from "vue";
const footerList = readonly([
  "关于 | 帮助 | 条款 | 反馈",
  "Copyright © 2024 Penis Music",
]);
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.penis-footer {
  width: 100%;
  height: $footer-height;
  padding: 20px 0;
  box-sizing: border-box;
  font-size: 14px;
  @include layout(center, center, column);
}

p {
  height: 30px;
}
</style>
