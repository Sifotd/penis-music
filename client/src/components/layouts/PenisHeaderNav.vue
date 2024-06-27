<template>
  <ul class="penis-header-nav">
    <li v-for="item in props.styleList" :class="{ active: item.name === props.activeName }" :key="item.path" @click="handleChangeView(item)">
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps({
  styleList: Array,
  activeName: String,
});

const emit = defineEmits(['click']);

const handleChangeView = (item: any) => {
  emit("click", item.path, item.name);
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

li {
  margin: $header-nav-margin;
  padding: $header-nav-padding;
  line-height: 3.3rem;
  color: $color-grey;
  border-bottom: none;
  cursor: pointer;
}

li.active {
  color: $color-black;
  font-weight: 600;
  border-bottom: 5px solid $color-black;
}
</style>
