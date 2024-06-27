<template>
  <div class="login-logo">
    <penis-icon :icon="icon"></penis-icon>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import PenisIcon from "./PenisIcon.vue";
import { Icon } from "@/enums";

const icon = ref(Icon.ERJI);
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.login-logo {
  background-color: $color-blue-light;
  height: calc(100vh - $header-height - $footer-height);
  min-width: 50vw;
  overflow: hidden;
  @include layout(center, center);
  .icon {
    @include icon(36rem, $color-blue-dark);
    transform: rotate(-30deg);
  }
}

@media screen and (min-width: $sm) {
  .login-logo {
    width: 50vw;
  }
}

@media screen and (max-width: $sm) {
  .login-logo {
    width: 100vw;
  }
}
</style>
