<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="props.icon"></use>
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  icon: String,
});
</script>
