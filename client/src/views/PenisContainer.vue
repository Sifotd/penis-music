<template>
  <el-container>
    <el-header>
      <penis-header></penis-header>
    </el-header>
    <el-main>
      <router-view />
      <penis-current-play></penis-current-play>
      <penis-play-bar></penis-play-bar>
      <penis-audio></penis-audio>
    </el-main>
    <el-footer>
      <penis-footer></penis-footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import PenisHeader from "@/components/layouts/PenisHeader.vue";
import PenisCurrentPlay from "@/components/layouts/PenisCurrentPlay.vue";
import PenisPlayBar from "@/components/layouts/PenisPlayBar.vue";
import PenisFooter from "@/components/layouts/PenisFooter.vue";
import PenisAudio from "@/components/layouts/PenisAudio.vue";

const { proxy } = getCurrentInstance();

if (sessionStorage.getItem("dataStore")) {
  proxy.$store.replaceState(Object.assign({}, proxy.$store.state, JSON.parse(sessionStorage.getItem("dataStore"))));
}

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("dataStore", JSON.stringify(proxy.$store.state));
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.el-container {
  min-height: calc(100% - 80px);
}
.el-header {
  padding: 0;
}
.el-main {
  padding-left: 0;
  padding-right: 0;
}
</style>
