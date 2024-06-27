<template>
  <ul class="penis-nav">
    <li v-for="(item, index) in props.styleList" :key="index" :class="{ active: item.name == props.activeName }" @click="handleChangeView(item)">
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps({
  styleList: Array,
  activeName: String
})
const emit = defineEmits(['click'])
const handleChangeView = (val: any) => {
  emit("click", val);
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.penis-nav {
  width: 100%;
  li {
    line-height: 2rem;
    font-size: 1rem;
    color: $color-grey;
    border-bottom: none;
    cursor: pointer;
  }
  li.active {
    color: $color-black;
    font-weight: 600;
  }
}

@media screen and (min-width: $sm) {
  .penis-nav {
    li {
      margin: 0.5rem 1rem;
    }
  }
}

@media screen and (max-width: $sm) {
  .penis-nav {
    li {
      margin: 0.3rem 0.4rem;
    }
  }
}
</style>
