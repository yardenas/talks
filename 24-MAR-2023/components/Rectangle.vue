<script setup lang="ts">
const props = defineProps<{
  width: string;
  height: string;
}>();
</script>

<template>
  <div
    :class="`flex bg-white border-dark-500 border-solid border-1 rounded-sm`"
  >
    <div :class="`m-auto`"><slot /></div>
  </div>
</template>
